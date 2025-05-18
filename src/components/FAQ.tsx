import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How does the system handle specialized vocabularies or technical content?",
    answer: "The AI is trained to understand and adapt to various lexicons, including industry-specific terminology and academic language. By fine-tuning on specialized datasets, it can accurately generate MCQs and chatbot responses tailored to specific fields."
  },
  {
    question: "What algorithms are used to process and interpret media in MCQs?",
    answer: "The platform uses convolutional neural networks (CNNs) and vision-language models to process and understand visual content. This allows the system to integrate images, videos, and diagrams into MCQs, providing a richer, more interactive experience."
  },
  {
    question: "How does the platform maintain performance under high traffic?",
    answer: "Our system is built on a microservices architecture, utilizing cloud-based infrastructure with automated scaling mechanisms. This ensures consistent performance even under heavy loads, with optimized latency and resource management."
  },
  {
    question: "How does the platform ensure data privacy and compliance?",
    answer: "The platform adheres to international data protection standards such as GDPR and CCPA. Data encryption at rest and in transit ensures high-level security, while audit trails and compliance monitoring meet regulatory requirements."
  },
  {
    question: "Can the AI improve over time with user feedback?",
    answer: "Yes, the system can incorporate feedback through reinforcement learning. Continuous user interactions help fine-tune the model, improving its accuracy and relevance over time, with safeguards in place to prevent the model from forgetting prior learning."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-[#222] rounded-xl overflow-hidden hover:border-primary transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5"
            >
              <span className="font-semibold">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 text-gray-400 animate-fadeIn">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}