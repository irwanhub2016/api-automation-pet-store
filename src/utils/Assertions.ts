import { expect, APIResponse } from '@playwright/test';
import { Pet, PetStatus } from '../models/Pet';

export class ApiAssertions {
  /**
   * Assert that API response has expected status code
   * @param response APIResponse to check
   * @param expectedStatus Expected HTTP status code
   */
  static async assertStatusCode(response: APIResponse, expectedStatus: number): Promise<void> {
    expect(response.status()).toBe(expectedStatus);
  }

  /**
   * Assert that API response is successful (2xx status)
   * @param response APIResponse to check
   */
  static async assertSuccess(response: APIResponse): Promise<void> {
    expect(response.ok()).toBeTruthy();
  }

  /**
   * Assert that response contains valid JSON
   * @param response APIResponse to check
   */
  static async assertValidJson(response: APIResponse): Promise<any> {
    const body = await response.json();
    expect(body).toBeDefined();
    return body;
  }

  /**
   * Assert that pet object has required fields
   * @param pet Pet object to validate
   */
  static assertValidPet(pet: Pet): void {
    expect(pet).toBeDefined();
    expect(pet.name).toBeDefined();
    expect(typeof pet.name).toBe('string');
    expect(pet.photoUrls).toBeDefined();
    expect(Array.isArray(pet.photoUrls)).toBeTruthy();
    
    if (pet.id) {
      expect(typeof pet.id).toBe('number');
    }
    
    if (pet.status) {
      expect(Object.values(PetStatus)).toContain(pet.status);
    }
    
    if (pet.category) {
      expect(pet.category).toBeDefined();
      if (pet.category.id) {
        expect(typeof pet.category.id).toBe('number');
      }
    }
    
    if (pet.tags) {
      expect(Array.isArray(pet.tags)).toBeTruthy();
      pet.tags.forEach(tag => {
        if (tag.id) {
          expect(typeof tag.id).toBe('number');
        }
      });
    }
  }

  /**
   * Assert that pet has expected name
   * @param pet Pet object to check
   * @param expectedName Expected pet name
   */
  static assertPetName(pet: Pet, expectedName: string): void {
    expect(pet.name).toBe(expectedName);
  }

  /**
   * Assert that pet has expected status
   * @param pet Pet object to check
   * @param expectedStatus Expected pet status
   */
  static assertPetStatus(pet: Pet, expectedStatus: PetStatus): void {
    expect(pet.status).toBe(expectedStatus);
  }

  /**
   * Assert that all pets in array have expected status
   * @param pets Array of pets to check
   * @param expectedStatus Expected status for all pets
   */
  static assertAllPetsHaveStatus(pets: Pet[], expectedStatus: PetStatus): void {
    expect(pets.length).toBeGreaterThan(0);
    pets.forEach(pet => {
      this.assertPetStatus(pet, expectedStatus);
    });
  }

  /**
   * Assert that pet was created successfully
   * @param response APIResponse from create pet request
   * @param expectedPet Expected pet data
   */
  static async assertPetCreated(response: APIResponse, expectedPet: Pet): Promise<Pet> {
    await this.assertStatusCode(response, 200);
    const createdPet = await this.assertValidJson(response);
    this.assertValidPet(createdPet);
    this.assertPetName(createdPet, expectedPet.name);
    
    if (expectedPet.status) {
      this.assertPetStatus(createdPet, expectedPet.status);
    }
    
    return createdPet as Pet;
  }

  /**
   * Assert that response complies with API contract
   * @param response APIResponse to validate
   * @param expectedFields Array of required field names
   */
  static async assertApiContract(response: APIResponse, expectedFields: string[]): Promise<any> {
    await this.assertSuccess(response);
    const body = await this.assertValidJson(response);
    
    expectedFields.forEach(field => {
      expect(body).toHaveProperty(field);
    });
    
    return body;
  }
}