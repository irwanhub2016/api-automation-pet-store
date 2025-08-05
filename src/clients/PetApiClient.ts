import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import { Pet, PetStatus, ApiResponse } from '../models/Pet';

export class PetApiClient extends BaseApiClient {
  private static readonly ENDPOINTS = {
    PET: '/pet',
    FIND_BY_STATUS: '/pet/findByStatus',
    FIND_BY_ID: (id: number) => `/pet/${id}`
  };

  constructor(request: APIRequestContext) {
    super(request);
  }

  /**
   * Add a new pet to the store
   * @param pet Pet object to be added
   * @returns APIResponse
   */
  async addPet(pet: Pet): Promise<APIResponse> {
    return await this.post(PetApiClient.ENDPOINTS.PET, pet);
  }

  /**
   * Update an existing pet
   * @param pet Pet object to be updated
   * @returns APIResponse
   */
  async updatePet(pet: Pet): Promise<APIResponse> {
    return await this.put(PetApiClient.ENDPOINTS.PET, pet);
  }

  /**
   * Find pets by status
   * @param status Pet status to filter by
   * @returns APIResponse containing array of pets
   */
  async findPetsByStatus(status: PetStatus): Promise<APIResponse> {
    return await this.get(PetApiClient.ENDPOINTS.FIND_BY_STATUS, { status });
  }

  /**
   * Find pet by ID
   * @param petId ID of pet to find
   * @returns APIResponse containing pet details
   */
  async findPetById(petId: number): Promise<APIResponse> {
    return await this.get(PetApiClient.ENDPOINTS.FIND_BY_ID(petId));
  }

  /**
   * Delete a pet
   * @param petId ID of pet to delete
   * @returns APIResponse
   */
  async deletePet(petId: number): Promise<APIResponse> {
    return await this.delete(PetApiClient.ENDPOINTS.FIND_BY_ID(petId));
  }

  /**
   * Parse response body as Pet object
   * @param response APIResponse to parse
   * @returns Promise<Pet>
   */
  async parsePetResponse(response: APIResponse): Promise<Pet> {
    const body = await response.json();
    return body as Pet;
  }

  /**
   * Parse response body as Pet array
   * @param response APIResponse to parse
   * @returns Promise<Pet[]>
   */
  async parsePetArrayResponse(response: APIResponse): Promise<Pet[]> {
    const body = await response.json();
    return body as Pet[];
  }

  /**
   * Parse response body as ApiResponse
   * @param response APIResponse to parse
   * @returns Promise<ApiResponse>
   */
  async parseApiResponse(response: APIResponse): Promise<ApiResponse> {
    const body = await response.json();
    return body as ApiResponse;
  }
}