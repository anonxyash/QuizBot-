import { Upload, Brain, Settings, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: "Input Content or Media",
    description: "Submit text or upload multimedia files, triggering the AI to process and generate relevant MCQs and chatbot responses."
  },
  {
    icon: Brain,
    title: "AI Processing",
    description: "The system uses advanced NLP and AI models to create complex, contextually relevant content and dynamic conversations."
  },
  {
    icon: Settings,
    title: "Customization",
    description: "Adjust generated content or interactions with detailed configuration options to meet your specific requirements."
  },
  {
    icon: Rocket,
    title: "Deploy",
    description: "Integrate with your web platforms or applications via API for seamless content delivery."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 container mx-auto px-4 relative overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center mb-6
                              group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-[1px] bg-gradient-to-r from-primary to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}