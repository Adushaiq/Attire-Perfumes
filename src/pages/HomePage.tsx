import { HeroSection } from '../components/home/HeroSection';
import { MarqueeBanner, CTABanner } from '../components/home/MarqueeBanner';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { CategoryBanner } from '../components/home/CategoryBanner';
import { NewArrivals } from '../components/home/NewArrivals';
import { BrandPromise } from '../components/home/BrandPromise';
import { Testimonials } from '../components/home/Testimonials';

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <MarqueeBanner />
      <FeaturedProducts />
      <CategoryBanner />
      <BrandPromise />
      <NewArrivals />
      <Testimonials />
      <CTABanner />
    </>
  );
};
