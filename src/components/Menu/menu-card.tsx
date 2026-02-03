import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

type MenuCardProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  image: string;
  description: string;
};

export function MenuCard({
  title,
  image,
  description,
  className,
  ...props
}: MenuCardProps) {
  return (
    <Card
      className={cn(
        'flex max-h-72 w-full max-w-72 flex-col items-center justify-center gap-8 px-4 py-8',
        className
      )}
      {...props}
    >
      <CardTitle>{title}</CardTitle>
      <CardContent className="p-0">
        <img
          draggable={false}
          width={48}
          src={`data:image/png;base64,${image}`}
          alt=""
        />
      </CardContent>
      <CardFooter className="p-0">
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardFooter>
    </Card>
  );
}
