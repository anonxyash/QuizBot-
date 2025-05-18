import { Brain, MessageSquare, Upload, Settings } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Driven MCQ & Chatbot Solution',
      description: 'Our platform leverages cutting-edge AI, powered by Google Gemini API, to autonomously generate sophisticated MCQs and facilitate intelligent chatbot interactions.'
    },
    {
      icon: MessageSquare,
      title: 'Automated MCQ Generation',
      description: 'Instantly create complex, contextually-aware multiple-choice questions using advanced NLP models. Fully customizable for high-level content creation.'
    },
    {
      icon: Upload,
      title: 'Seamless Media Integration',
      description: 'Upload and integrate images, videos, and diagrams directly into your MCQs and chatbot flows, enhancing interactive learning and engagement.'
    },
    {
      icon: Settings,
      title: 'End-to-End Customization',
      description: 'Tailor every aspect of content and interaction, from question complexity to chatbot behavior, with granular control over all outputs.'
    }
  ];

  return (
    <section id="features" className="py-20 container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-black/30 p-8 rounded-xl border border-[#222] backdrop-blur-sm
                     hover:border-primary transition-all duration-300 hover:-translate-y-2
                     group"
          >
            <feature.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}