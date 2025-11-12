'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';

// Tipagens
interface User {
  id: string;
  email: string;
}

interface AIDesignerToolProps {
  user: User;
}

export default function AIDesignerTool({ user }: AIDesignerToolProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [stylePrompt, setStylePrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const availableStyles = [
    'Luxo Turco Clássico (Azul e Ouro)',
    'Moderno Istambul (Minimalista com Madeira)',
    'Padrões Geométricos Otomanos',
    'Estuque Veneziano e Materiais Ricos',
    'Cozinha com Revestimento de Pedra Natural',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setMessage(null);
      setResultImage(null);
    }
  };

  // MONITORAMENTO DO REPLICATE
  const monitorPrediction = (predictionId: string) => {
    const interval = setInterval(async () => {
      const checkResponse = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: { Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_READONLY_KEY}` },
      });

      if (!checkResponse.ok) {
        console.error("Monitoramento falhou:", await checkResponse.text());
        clearInterval(interval);
        setMessage("Erro ao monitorar a IA. Tente novamente.");
        setLoading(false);
        return;
      }

      const checkData = await checkResponse.json();
      const status = checkData.status;
      setMessage(`3/4: Status da IA: ${status}... (Aguardando resultado)`);

      if (status === 'succeeded' && checkData.output?.length > 0) {
        clearInterval(interval);
        const finalImageUrl = checkData.output[0];

        await supabase.from('ai_requests').insert({
          user_id: user.id,
          input_url: checkData.input.image,
          output_url: finalImageUrl,
          prompt_details: checkData.input.prompt,
          status: 'Completed',
          cost_usd: 0.05,
        });

        setResultImage(finalImageUrl);
        setMessage('4/4: CONCLUÍDO! Seu Design Turco está pronto.');
        setLoading(false);
      } else if (status === 'failed' || status === 'canceled') {
        clearInterval(interval);
        setMessage(`Erro na geração: ${checkData.error || 'Falha desconhecida.'}`);
        setLoading(false);
      }
    }, 8000);
  };

  // PRINCIPAL
  const handleGenerate = async () => {
    if (!selectedFile || !stylePrompt || !user?.id) {
      setMessage('Erro: Faltam dados ou a sessão é inválida.');
      return;
    }

    setLoading(true);
    setResultImage(null);
    setMessage('1/4: A carregar a foto...');

    const { data: { session } } = await supabase.auth.getSession();
    const jwtToken = session?.access_token;

    if (!jwtToken) {
      setMessage('Erro: Sessão expirada. Faça login novamente.');
      setLoading(false);
      return;
    }

    // UPLOAD PARA SUPABASE
    const filePath = `${user.id}/${Date.now()}_${selectedFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from('ai-designer-uploads')
      .upload(filePath, selectedFile, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error(uploadError);
      setMessage(`Erro ao carregar a foto: ${uploadError.message}`);
      setLoading(false);
      return;
    }

    const globalImageUrlPath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ai-designer-uploads/${filePath}`;

    // CHAMADA DA EDGE FUNCTION
    setMessage('2/4: A invocar o Designer AI...');

    try {
      const edgeFunctionUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/generate-ai-design`;
      const edgeResponse = await fetch(edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          input_url: globalImageUrlPath,
          style_prompt: stylePrompt,
        }),
      });

      const data = await edgeResponse.json();
      if (!edgeResponse.ok) throw new Error(data.error || 'Erro desconhecido na IA.');

      if (data.id) {
        monitorPrediction(data.id);
      } else {
        throw new Error('ID da previsão não retornado.');
      }
    } catch (err: any) {
      console.error(err);
      setMessage(`Erro na geração: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="card w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">1. Carregue a Foto do seu Espaço</h3>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full p-3 border border-gray-300 rounded-md file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
      />

      {selectedFile && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Imagem para Remodelar:</p>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Pré-visualização"
            className="max-h-64 w-auto rounded-lg shadow-md"
          />
        </div>
      )}

      <hr />

      <h3 className="text-xl font-semibold text-gray-800">2. Escolha o Estilo Turco</h3>
      <select
        value={stylePrompt}
        onChange={(e) => setStylePrompt(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
      >
        <option value="" disabled>Selecione um estilo</option>
        {availableStyles.map(style => (
          <option key={style} value={style}>{style}</option>
        ))}
      </select>

      <button
        onClick={handleGenerate}
        disabled={loading || !selectedFile || !stylePrompt}
        className={`w-full py-3 rounded-md text-white font-bold transition duration-300 ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700'
        }`}
      >
        {loading ? 'A Criar Design...' : 'GERAR DESIGN TURCO AI'}
      </button>

      {message && (
        <div className={`p-4 rounded-lg text-center ${
          loading ? 'bg-blue-100 text-blue-800' :
          resultImage ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      {resultImage && (
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Seu Novo Espaço</h3>
          <img src={resultImage} alt="Resultado IA" className="w-full rounded-lg shadow-xl" />
          <a href={resultImage} target="_blank" download className="mt-4 inline-block text-amber-600 hover:text-amber-800 font-semibold">
            Clique para Download
          </a>
          <p className="mt-4 text-gray-700 font-semibold">
            ✅ O seu design exclusivo está pronto. Podemos começar o seu projeto?
          </p>
        </div>
      )}
    </div>
  );
}
