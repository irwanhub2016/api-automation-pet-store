export interface Category {
  id?: number;
  name?: string;
}

export interface Tag {
  id?: number;
  name?: string;
}

export enum PetStatus {
  AVAILABLE = 'available',
  PENDING = 'pending',
  SOLD = 'sold'
}

export interface Pet {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  status?: PetStatus;
}

export interface ApiResponse {
  code?: number;
  type?: string;
  message?: string;
}

export class PetBuilder {
  private pet: Pet;

  constructor() {
    this.pet = {
      name: '',
      photoUrls: []
    };
  }

  withId(id: number): PetBuilder {
    this.pet.id = id;
    return this;
  }

  withName(name: string): PetBuilder {
    this.pet.name = name;
    return this;
  }

  withCategory(category: Category): PetBuilder {
    this.pet.category = category;
    return this;
  }

  withPhotoUrls(photoUrls: string[]): PetBuilder {
    this.pet.photoUrls = photoUrls;
    return this;
  }

  withTags(tags: Tag[]): PetBuilder {
    this.pet.tags = tags;
    return this;
  }

  withStatus(status: PetStatus): PetBuilder {
    this.pet.status = status;
    return this;
  }

  build(): Pet {
    if (!this.pet.name) {
      throw new Error('Pet name is required');
    }
    return { ...this.pet };
  }

  static createDefaultPet(name: string): Pet {
    return new PetBuilder()
      .withName(name)
      .withCategory({ id: 1, name: 'Cats' })
      .withPhotoUrls(['https://example.com/photo1.jpg'])
      .withTags([{ id: 1, name: 'friendly' }])
      .withStatus(PetStatus.AVAILABLE)
      .build();
  }
}