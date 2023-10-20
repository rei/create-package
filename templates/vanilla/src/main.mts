export interface Item {
  name: string,
  description?: string,
}

export interface Product extends Item {
  sku: string,
  price: number,
}

function getUSDFormatter() {
  const nf = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return nf.format;
}

/**
 * Totals an array of Products.
 */
export function getTotal(products: Product[]) {
  return products.reduce((acc, cur) => acc + cur.price, 0);
}

export function getFormattedTotal(products:Product[]) {
  const format = getUSDFormatter();
  return format(getTotal(products));
}

/**
 * Sorts types with a price field. (descending order)
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
