import { ChangeEvent, FormEvent, useState } from "react";
import { User, Mail, MessageCircle } from "lucide-react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl px-4 mx-auto lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Entre em Contato</h2>
          <p className="mt-4 text-lg text-gray-600">
            Tem dúvidas ou sugestões? Envie sua mensagem, e responderemos o mais breve possível.
          </p>
        </div>

        <div className="mt-12">
          {submitted ? (
            <div className="p-4 text-center text-white bg-blue-600 rounded-lg shadow-md">
              <p>Obrigado por entrar em contato! Responderemos em breve.</p>
            </div>
          ) : (
            <div className="px-4 py-8 bg-white rounded-lg shadow-xl sm:px-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="flex items-center text-lg font-medium text-gray-700">
                    <User className="w-5 h-5 mr-2 text-gray-500" />
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="flex items-center text-lg font-medium text-gray-700">
                    <Mail className="w-5 h-5 mr-2 text-gray-500" />
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Seu e-mail"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="flex items-center text-lg font-medium text-gray-700">
                    <MessageCircle className="w-5 h-5 mr-2 text-gray-500" />
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    placeholder="Sua mensagem"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex justify-center w-full px-4 py-2 text-lg font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Enviar Mensagem
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
