import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // Tells Apollo that we will take care of everything
    read(existing = [], { args, cache }) {
      console.log({ existing, args, cache });
      const { skip, first } = args; // destructure skip and args into their own variables

      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?.allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing data
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // If there are items
      // AND there aren't enough to fill the page
      // AND we are on the last page
      // THEN just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // If we don't see any items here, we must fo to the Netowrk and fetch them
        return false;
      }

      // If there are items, just return them from the cache. and we don't need to go to the network.
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache! Gonna send them to Apollo`
        );
        return items;
      }

      return false;

      // First thing it does is ask the read function for those items
      // We can either do one of two things:
      // First thing we can do is return the items because the are already in the cache
      // Second things we can do it to return false from here, and make a network request
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the Apollo Client comes back from the network with out product data
      console.log('Merging items from the network');
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}
