import { AppDataSource } from '../data-source';
import { Address } from '../entities/Address';

const addressRepo = AppDataSource.getRepository(Address);

export const createAddress = (data: Partial<Address>) => addressRepo.save(addressRepo.create(data));
export const getAllAddress = () => addressRepo.find();
export const getAddressById = (id: number) => addressRepo.findOneBy({ id });
export const updateAddress = async (id: number, data: Partial<Address>) => {
    const entity = await addressRepo.findOneBy({ id });
    if (!entity) return null;
    addressRepo.merge(entity, data);
    return addressRepo.save(entity);
};
export const deleteAddress = (id: number) => addressRepo.delete({ id }); 