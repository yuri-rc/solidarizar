import type { LucideProps } from 'lucide-react'
import {
  Utensils,
  Shirt,
  Sparkles,
  HeartPulse,
  Package,
  Building2,
  CheckCircle2,
  MapPin,
  Heart,
  Handshake,
  Target,
  Clock,
  Lightbulb,
  Lock,
  Inbox,
  ArrowLeft,
  ArrowRight,
  X,
  Check,
  Menu,
  User,
  Trash2,
  FileEdit,
  HeartHandshake,
} from 'lucide-react'

export interface IconProps extends LucideProps {
  size?: number
}

export const IconFood = (props: IconProps) => <Utensils size={16} {...props} />
export const IconClothing = (props: IconProps) => <Shirt size={16} {...props} />
export const IconHygiene = (props: IconProps) => <Sparkles size={16} {...props} />
export const IconHealth = (props: IconProps) => <HeartPulse size={16} {...props} />
export const IconPackage = (props: IconProps) => <Package size={16} {...props} />
export const IconBuilding = (props: IconProps) => <Building2 size={16} {...props} />
export const IconCheckCircle = (props: IconProps) => <CheckCircle2 size={16} {...props} />
export const IconPin = (props: IconProps) => <MapPin size={16} {...props} />
export const IconHeart = (props: IconProps) => <Heart size={16} {...props} />
export const IconHeartFilled = (props: IconProps) => <Heart size={16} fill="currentColor" {...props} />
export const IconSparkle = (props: IconProps) => <Sparkles size={16} {...props} />
export const IconHandshake = (props: IconProps) => <Handshake size={16} {...props} />
export const IconTarget = (props: IconProps) => <Target size={16} {...props} />
export const IconClock = (props: IconProps) => <Clock size={16} {...props} />
export const IconLightbulb = (props: IconProps) => <Lightbulb size={16} {...props} />
export const IconLock = (props: IconProps) => <Lock size={16} {...props} />
export const IconEmpty = (props: IconProps) => <Inbox size={16} {...props} />
export const IconArrowLeft = (props: IconProps) => <ArrowLeft size={16} {...props} />
export const IconArrowRight = (props: IconProps) => <ArrowRight size={16} {...props} />
export const IconInbox = (props: IconProps) => <Inbox size={16} {...props} />
export const IconClose = (props: IconProps) => <X size={16} {...props} />
export const IconCheck = (props: IconProps) => <Check size={16} {...props} />
export const IconMenu = (props: IconProps) => <Menu size={16} {...props} />
export const IconUser = (props: IconProps) => <User size={16} {...props} />
export const IconTrash = (props: IconProps) => <Trash2 size={16} {...props} />
export const IconHeartLogo = (props: IconProps) => <HeartHandshake size={22} {...props} />
export const IconEdit = (props: IconProps) => <FileEdit size={16} {...props} />
