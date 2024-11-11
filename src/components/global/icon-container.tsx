import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  icon: React.JSX.Element | React.ReactNode;
}

const IconContainer = ({ icon, className, ...props }: Props) => {
  return (
    <div className={cn("w-8 h-8 bg-primary-foreground flex justify-center items-center text-primary rounded-md aspect-square", className)} {...props}>
      {icon}
    </div>
  )
}

export default IconContainer