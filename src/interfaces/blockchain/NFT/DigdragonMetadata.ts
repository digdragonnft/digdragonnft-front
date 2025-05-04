export interface DigDragonMeta {
  tokenId?: string;
  name: string;
  description: string;
  image: string;
  attributes: [
    {
      trait_type: string;
      value: string;
    },
  ];
  hash_tags: string[];
  animation_url: string;
  media: string[];
}
