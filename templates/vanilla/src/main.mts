export interface Item {
  name: string,
  description?: string,
}

export interface Product extends Item {
  sku: string,
  price: number,
}

/**
 * Totals an array of Products
 */
export function getTotal(products: Product[]) {
  return products.reduce((acc, cur) => acc + cur.price, 0);
}

/**
 * Sorts types with a price field. (descending order)
 * Illustrates the concept of TypeScript's structural type system.
 * I.e., sortByPrice will sort anything with a price property, not only a Product.
 * @param products
 * @returns
 */
function sortByPrice(products: { price: number }[]) {
  return products.sort((a, b) => {
    if (a.price > b.price) {
      return -1;
    }
    if (a.price < b.price) {
      return 1;
    }
    return 0;
  });
}

/**
 * Get max-priced item
 */
export function getMaxPriceItem(products: Product[]) {
  const sorted = sortByPrice(products);
  return sorted.length > 0 ? sorted[0] : null;
}

/**
 * startsWith polyfill
 */
export function startsWith(str: string, searchString: string, position: number = 0) {
  return str.substring(position, position + searchString.length) === searchString;
}
