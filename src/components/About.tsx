import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
            About Raj Milk Center
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            For over two decades, Raj Milk Center has been your trusted source for premium dairy products. 
            We work directly with local farms to bring you the freshest milk, cheese, yogurt, and more. 
            Our commitment to quality and freshness has made us a household name in the community.
          </p>
          <p className="text-lg text-muted-foreground mb-10">
            From farm to table, we ensure every product meets our high standards of purity and taste. 
            Experience the difference that comes with authentic, locally-sourced dairy products.
          </p>
          <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
            Learn More About Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;