import { Pet, PetStatus, PetBuilder, Category, Tag } from '../models/Pet';

export class TestDataFactory {
  private static readonly DEFAULT_CATEGORY: Category = {
    id: 1,
    name: 'Cats'
  };

  private static readonly DEFAULT_TAGS: Tag[] = [
    { id: 1, name: 'friendly' },
    { id: 2, name: 'cute' }
  ];

  private static readonly DEFAULT_PHOTO_URLS = [
    'https://example.com/photo1.jpg',
    'https://example.com/photo2.jpg'
  ];

  /**
   * Create a pet with default values and specified name
   * @param name Pet name
   * @param status Pet status (default: AVAILABLE)
   * @returns Pet object
   */
  static createPet(name: string, status: PetStatus = PetStatus.AVAILABLE): Pet {
    return new PetBuilder()
      .withName(name)
      .withCategory(this.DEFAULT_CATEGORY)
      .withPhotoUrls(this.DEFAULT_PHOTO_URLS)
      .withTags(this.DEFAULT_TAGS)
      .withStatus(status)
      .build();
  }

  /**
   * Create a pet with minimal required fields
   * @param name Pet name
   * @returns Pet object with minimal data
   */
  static createMinimalPet(name: string): Pet {
    return new PetBuilder()
      .withName(name)
      .withPhotoUrls(['https://example.com/photo.jpg'])
      .build();
  }

  /**
   * Create a pet with custom category
   * @param name Pet name
   * @param category Custom category
   * @returns Pet object
   */
  static createPetWithCategory(name: string, category: Category): Pet {
    return new PetBuilder()
      .withName(name)
      .withCategory(category)
      .withPhotoUrls(this.DEFAULT_PHOTO_URLS)
      .withTags(this.DEFAULT_TAGS)
      .withStatus(PetStatus.AVAILABLE)
      .build();
  }

  /**
   * Create a pet with custom tags
   * @param name Pet name
   * @param tags Custom tags
   * @returns Pet object
   */
  static createPetWithTags(name: string, tags: Tag[]): Pet {
    return new PetBuilder()
      .withName(name)
      .withCategory(this.DEFAULT_CATEGORY)
      .withPhotoUrls(this.DEFAULT_PHOTO_URLS)
      .withTags(tags)
      .withStatus(PetStatus.AVAILABLE)
      .build();
  }

  /**
   * Get test pets for different scenarios
   */
  static getTestPets() {
    return {
      cat1: this.createPet('Cat1', PetStatus.AVAILABLE),
      cat2: this.createPet('Cat2', PetStatus.AVAILABLE),
      dogPending: this.createPet('Dog1', PetStatus.PENDING),
      birdSold: this.createPet('Bird1', PetStatus.SOLD)
    };
  }

  /**
   * Get categories for testing
   */
  static getTestCategories(): Category[] {
    return [
      { id: 1, name: 'Cats' },
      { id: 2, name: 'Dogs' },
      { id: 3, name: 'Birds' },
      { id: 4, name: 'Fish' }
    ];
  }

  /**
   * Get tags for testing
   */
  static getTestTags(): Tag[] {
    return [
      { id: 1, name: 'friendly' },
      { id: 2, name: 'cute' },
      { id: 3, name: 'playful' },
      { id: 4, name: 'calm' },
      { id: 5, name: 'energetic' }
    ];
  }

  /**
   * Get all pet statuses for testing
   */
  static getAllPetStatuses(): PetStatus[] {
    return Object.values(PetStatus);
  }
}