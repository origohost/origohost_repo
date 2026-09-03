import {
  Rocket,
  GraduationCap,
  Building2,
  Handshake,
  Landmark,
  Heart,
  Users,
  Star,
  Sparkles,
  Globe,
  Headphones,
  Briefcase,
  Cloud,
  ShieldCheck,
  Zap,
  Layers,
  BookOpen,
  Trophy,
  Compass,
  MessageCircle,
  Send,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { DiscordIcon, WhatsAppIcon, InstagramIcon } from "@/components/icons";

const ICONS: Record<string, React.ElementType> = {
  Rocket,
  GraduationCap,
  Building2,
  Handshake,
  Landmark,
  Heart,
  Users,
  Star,
  Sparkles,
  Globe,
  Headphones,
  Briefcase,
  Cloud,
  ShieldCheck,
  Zap,
  Layers,
  BookOpen,
  Trophy,
  Compass,
  MessageCircle,
  Send,
  Mail,
  Phone,
  MapPin,
  DiscordIcon,
  WhatsAppIcon,
  InstagramIcon,
};

/** Resolve an icon by name from CMS content. Falls back to Sparkles. */
export function resolveIcon(name?: string): React.ElementType {
  if (!name) return Sparkles;
  return ICONS[name] ?? Sparkles;
}
