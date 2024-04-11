import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default function Index() {
  return (
    <div className="flex flex-col gap-6">
      <Button className="w-fit">Button</Button>
      <Card>
        <CardHeader>
          <div>tt</div>
          <CardTitle>Card Title</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
      </Card>
    </div>
  );
}
