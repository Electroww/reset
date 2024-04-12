import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion-card';

export default function Index() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <Button className="w-fit">Button</Button>
      <Button variant="outline" size="sm" className="w-fit">
        Un autre bouton
      </Button>
      <Card>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <CardHeader>
              <AccordionTrigger>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl overflow-hidden">
                    <img alt="T1" src="https://logo.clearbit.com/t1.gg" />
                  </div>
                  <CardTitle>Une application</CardTitle>
                </div>
              </AccordionTrigger>
            </CardHeader>
            <CardContent>
              <AccordionContent>Liste des membres</AccordionContent>
            </CardContent>
          </AccordionItem>
        </Accordion>
      </Card>
      <Card>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <CardHeader>
              <AccordionTrigger>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl overflow-hidden">
                    <img alt="T1" src="https://logo.clearbit.com/freecs.gg" />
                  </div>
                  <CardTitle>Une seconde application</CardTitle>
                </div>
              </AccordionTrigger>
            </CardHeader>
            <CardContent>
              <AccordionContent>Liste des membres</AccordionContent>
            </CardContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
}
