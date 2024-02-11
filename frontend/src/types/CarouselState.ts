import CarouselItem from "./CarouselItem";

export default interface CarouselState {
  carouselItems: CarouselItem[];
  loading: boolean;
  error: string | undefined;
}
