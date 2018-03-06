/**
 * .app/components/listings
 */

import Listing from './IndexListing.jsx';
import ProductListing from './ProductListing.jsx';
import CreditorListing from './CreditorListing.jsx';
import { CreditorItems } from './CreditorItem.jsx';
import { ProductSoldRegister } from './RegistryListings.jsx';
 
export const MainList = Listing;
export const ProductsList = ProductListing;
export const CreditorsList = CreditorListing; 
export const CreditorItemsList = CreditorItems;
export const ProductSold = ProductSoldRegister;