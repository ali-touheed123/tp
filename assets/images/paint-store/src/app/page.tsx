import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import BrandsSection from '@/components/BrandsSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import FeaturesSection from '@/components/FeaturesSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <BrandsSection />
      <FeaturesSection />
    </>
  );
}
