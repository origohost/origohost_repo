import { m as motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { EventAgendaItem } from "../types";

interface EventAgendaProps {
  agenda: EventAgendaItem[];
}

export function EventAgenda({ agenda }: EventAgendaProps) {
  if (!agenda || agenda.length === 0) return null;

  return (
    <div className="py-12">
      <h2 className="text-3xl font-black text-gray-900 mb-8">Schedule & Agenda</h2>

      <div className="relative border-l-2 border-gray-200 ml-4 md:ml-6 space-y-8">
        {agenda.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />

            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-2">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-lg min-w-[120px]">
                <Clock className="w-4 h-4" />
                {item.start_time}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
            </div>

            {item.description && (
              <p className="text-gray-600 leading-relaxed max-w-2xl">{item.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
