import { Instagram, Mail, MapPin, ArrowRight } from 'lucide-react'; 

export default function ContactLinks() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <a
        href="https://www.instagram.com/theaxiomcore?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between p-6 border border-[#222] rounded-xl hover:border-primary transition-colors hover-up"
      >
        <div className="flex items-center gap-4">
          <Instagram className="w-8 h-8 neon-green" />
          <div>
            <h3 className="font-semibold">Instagram</h3>
            <p className="text-gray-400">@theaxiomcore</p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 neon-green" />
      </a>

      <a
        href="mailto:theaxiomcore@gmail.com"
        className="flex items-center justify-between p-6 border border-[#222] rounded-xl hover:border-primary transition-colors hover-up"
      >
        <div className="flex items-center gap-4">
          <Mail className="w-8 h-8 neon-green" />
          <div>
            <h3 className="font-semibold">Email</h3>
            <p className="text-gray-400">theaxiomcore@gmail.com</p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 neon-green" />
      </a>

      <div className="flex items-center gap-4 p-6 border border-[#222] rounded-xl">
        <MapPin className="w-8 h-8 neon-green" />
        <div>
          <h3 className="font-semibold">Location</h3>
          <p className="text-gray-400">Chattisghar, India</p>
        </div>
      </div>
    </div>
  );
}
