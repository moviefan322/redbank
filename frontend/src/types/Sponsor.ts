interface ImageSpecs {
  imageUrl: string;
  height: number;
  width: number;
  borderRadius: number;
  url?: string;
}

export default interface Sponsor {
  name: string;
  image: ImageSpecs;
  url?: string;
}
