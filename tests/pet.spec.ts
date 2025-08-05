import { test, expect } from '@playwright/test';
import { PetApiClient } from '../src/clients/PetApiClient';
import { Pet, PetStatus } from '../src/models/Pet';
import { ApiAssertions } from '../src/utils/Assertions';
import { TestDataFactory } from '../src/testData/TestDataFactory';

test.describe('Pet Store API Tests', () => {
  let petApiClient: PetApiClient;
  const createdPetIds: number[] = [];

  test.beforeEach(async ({ request }) => {
    petApiClient = new PetApiClient(request);
  });

  test.afterEach(async () => {
    // Cleanup: Delete created pets
    for (const petId of createdPetIds) {
      try {
        await petApiClient.deletePet(petId);
      } catch (error) {
        console.log(`Failed to cleanup pet ${petId}:`, error);
      }
    }
    createdPetIds.length = 0;
  });

  test('TC001: Add new pet with name "Cat1" and verify creation', async () => {
    const petData = TestDataFactory.createPet('Cat1', PetStatus.AVAILABLE);
    
    const response = await petApiClient.addPet(petData);
    
    const createdPet = await ApiAssertions.assertPetCreated(response, petData);
    
    // Verify pet details
    expect(createdPet.id).toBeDefined();
    expect(typeof createdPet.id).toBe('number');
    ApiAssertions.assertPetName(createdPet, 'Cat1');
    ApiAssertions.assertPetStatus(createdPet, PetStatus.AVAILABLE);
    ApiAssertions.assertValidPet(createdPet);
    
    if (createdPet.id) {
      createdPetIds.push(createdPet.id);
    }
    
    console.log(`✅ Successfully created pet: ${JSON.stringify(createdPet)}`);
  });

  test('TC002: Add new pet with name "Cat2" and verify creation', async () => {
    const petData = TestDataFactory.createPet('Cat2', PetStatus.AVAILABLE);
    
    const response = await petApiClient.addPet(petData);
    
    const createdPet = await ApiAssertions.assertPetCreated(response, petData);
    
    // Verify pet details
    expect(createdPet.id).toBeDefined();
    expect(typeof createdPet.id).toBe('number');
    ApiAssertions.assertPetName(createdPet, 'Cat2');
    ApiAssertions.assertPetStatus(createdPet, PetStatus.AVAILABLE);
    ApiAssertions.assertValidPet(createdPet);
    
    // Store for cleanup
    if (createdPet.id) {
      createdPetIds.push(createdPet.id);
    }
    
    console.log(`✅ Successfully created pet: ${JSON.stringify(createdPet)}`);
  });

  test('TC003: Find pets by status "available" and verify correct status', async () => {
    // Arrange - Create a pet with available status first
    const availablePet = TestDataFactory.createPet('TestAvailablePet', PetStatus.AVAILABLE);
    const createResponse = await petApiClient.addPet(availablePet);
    const createdPet = await petApiClient.parsePetResponse(createResponse);
    
    if (createdPet.id) {
      createdPetIds.push(createdPet.id);
    }
  
    const response = await petApiClient.findPetsByStatus(PetStatus.AVAILABLE);
    
    await ApiAssertions.assertSuccess(response);
    const pets = await petApiClient.parsePetArrayResponse(response);
    
    // Verify response structure
    expect(Array.isArray(pets)).toBeTruthy();
    expect(pets.length).toBeGreaterThan(0);
    
    // Verify all pets have available status
    pets.forEach(pet => {
      ApiAssertions.assertValidPet(pet);
      if (pet.status) { // Some pets might not have status field
        ApiAssertions.assertPetStatus(pet, PetStatus.AVAILABLE);
      }
    });
    
    // Verify our created pet is in the results
    const ourPet = pets.find(pet => pet.id === createdPet.id);
    expect(ourPet).toBeDefined();
    
    console.log(`✅ Found ${pets.length} available pets`);
  });

  test('TC004: Find pets by status "pending" and verify correct status', async () => {
    const pendingPet = TestDataFactory.createPet('TestPendingPet', PetStatus.PENDING);
    const createResponse = await petApiClient.addPet(pendingPet);
    const createdPet = await petApiClient.parsePetResponse(createResponse);

    if (createdPet.id) {
      createdPetIds.push(createdPet.id);
    }
    
    const response = await petApiClient.findPetsByStatus(PetStatus.PENDING);
    
    await ApiAssertions.assertSuccess(response);
    const pets = await petApiClient.parsePetArrayResponse(response);
  
    // Verify response structure
    expect(Array.isArray(pets)).toBeTruthy();
    
    if (pets.length > 0) {
      // Verify all pets have pending status
      pets.forEach(pet => {
        ApiAssertions.assertValidPet(pet);
        if (pet.status) { // Some pets might not have status field
          ApiAssertions.assertPetStatus(pet, PetStatus.PENDING);
        }
      });
      
      // Verify our created pet is in the results
      const ourPet = pets.find(pet => pet.id === createdPet.id);
      expect(ourPet).toBeDefined();
    }
    
    console.log(`✅ Found ${pets.length} pending pets`);
  });

  test('TC005: Find pet by ID and verify response complies with contract', async () => {
    const petId = 5;
    const response = await petApiClient.findPetById(petId);
    
    await ApiAssertions.assertStatusCode(response, 200);
    
    // Verify API contract compliance
    const requiredFields = ['id', 'photoUrls'];
    const petResponse = await ApiAssertions.assertApiContract(response, requiredFields);
    
    // Verify response matches expected structure
    expect(petResponse.id).toBeDefined();
    expect(typeof petResponse.id).toBe('number');
    expect(Array.isArray(petResponse.photoUrls)).toBeTruthy();
    expect(Array.isArray(petResponse.tags)).toBeTruthy();
    
    // Log successful verification
    console.log(`✅ Successfully verified pet with ID ${petResponse.id}`);
  });

  test('TC006: Find pet by non-existent ID should return 404', async () => {
    // Arrange
    const nonExistentId = 999911111;
    
    // Act
    const response = await petApiClient.findPetById(nonExistentId);
    
    // Assert
    await ApiAssertions.assertStatusCode(response, 404);
    
    console.log(`✅ Correctly received 404 for non-existent pet ID ${nonExistentId}`);
  });
});