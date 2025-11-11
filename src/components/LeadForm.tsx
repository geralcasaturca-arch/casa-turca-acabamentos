// /src/components/LeadForm.tsx

'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    projectType: '',
    estimatedBudget: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const projectTypes = [
    'Cozinha de Luxo', 
    'Sala de Estar Nobre', 
    'Banheiro Master', 
    'Reforma Total',
    'Outro (Especificar no Follow-up)'
  ];

  // Opções de Orçamento de Alto Valor (em Kwanza, você pode ajustar a moeda)
  const budgets = [
    '500.000 Kz - 1.000.000 Kz', 
    '1.000.000 Kz - 3.000.000 Kz', 
    'Acima de 3.000.000 Kz',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    try {
      // 1. Inserir o Lead na tabela 'leads'
      const { data: lead, error: insertError } = await supabase
        .from('leads')
        .insert({
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          email: formData.email,
          project_type: formData.projectType,
          estimated_budget: formData.estimatedBudget,
          is_qualified: true, // Marcamos como qualificado por preencherem o formulário
        })
        .select()
        .single();
        
      if (insertError) {
        if (insertError.code === '23505') { 
           // Se o email já existe, apenas prosseguimos para o Magic Link.
        } else {
            throw insertError;
        }
      }

      // 2. Enviar Magic Link para Autenticação
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          emailRedirectTo: `${window.location.origin}/ai-designer-tool`, 
        },
      });

      if (authError) {
        throw authError;
      }

      setIsSuccess(true);
      setMessage('Sucesso! Verifique seu e-mail. Enviámos a chave de acesso (Magic Link) para o Designer AI.');
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        projectType: '',
        estimatedBudget: '',
      });

    } catch (error) {
      console.error('Erro ao processar lead/login:', error);
      setMessage('Ocorreu um erro. Por favor, tente novamente ou verifique se o e-mail está correto.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // UI (Visual) do Formulário
  return (
    <div className="card max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-serif text-center text-gray-900 mb-4">
        Desbloqueie o AI Designer Exclusivo
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Preencha o formulário para receber a sua **chave de acesso imediata** por e-mail e começar a desenhar seu projeto de luxo.
      </p>

      {/* Mensagem de Feedback */}
      {message && (
        <div className={`p-4 mb-4 rounded-lg ${isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campos de Contacto */}
        <input
          type="text"
          name="fullName"
          placeholder="Nome Completo"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Telefone (WhatsApp)"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail de Acesso (Sua Chave)"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
        />

        {/* Campos de Qualificação de Projeto (Dropdowns) */}
        <select
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
        >
          <option value="" disabled>Qual o seu Projeto de Design?</option>
          {projectTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        
        <select
          name="estimatedBudget"
          value={formData.estimatedBudget}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
        >
          <option value="" disabled>Orçamento Estimado</option>
          {budgets.map(budget => (
            <option key={budget} value={budget}>{budget}</option>
          ))}
        </select>

        {/* Botão de Submissão */}
        <button
          type="submit"
          disabled={loading || isSuccess}
          className={`w-full py-3 rounded-md text-white font-bold transition duration-300 ${
            loading || isSuccess
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-amber-600 hover:bg-amber-700'
          }`}
        >
          {loading ? 'A Enviar Chave...' : 'ENVIAR & RECEBER CHAVE DE ACESSO'}
        </button>
        <p className="text-center text-xs text-gray-500">
            Ao clicar, concorda em receber a sua chave de acesso por e-mail.
        </p>
      </form>
    </div>
  );
}
