import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'; 

export default function Contact() {
  return (
    <section className="py-20 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <a
          href="https://wa.me/918319712700"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-6 border border-[#222] rounded-xl hover:border-primary/60 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <Phone className="w-8 h-8 text-primary group-hover:-translate-y-1 transition-transform" />
            <div>
              <h3 className="font-semibold">WhatsApp</h3>
              <p className="text-gray-400">+91 8319712700</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
        </a>

        <a
          href="mailto:contact@studybot.ai"
          className="flex items-center justify-between p-6 border border-[#222] rounded-xl hover:border-primary/60 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <Mail className="w-8 h-8 text-primary group-hover:-translate-y-1 transition-transform" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-400">contact@studybot.ai</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
        </a>

        <div className="flex items-center gap-4 p-6 border border-[#222] rounded-xl">
          <MapPin className="w-8 h-8 text-primary" />
          <div>
            <h3 className="font-semibold">Location</h3>
            <p className="text-gray-400">Chattisghar, India</p>
          </div>
        </div>
      </div>
    </section>
  );
}