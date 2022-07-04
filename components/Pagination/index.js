import React from "react";
import { useRouter } from "next/router";
import { useTypeSelector } from "../../store/hooks/useSelector";
import { useTypeDispatch } from "../../store/hooks/useDispatch";
import ReactPaginate from "react-paginate";

const Pagination = ({ type = "category", id = 0 }) => {
  const { filteredProducts, params } = useTypeSelector(
    (state) => state.category
  );
  const { query, push } = useRouter();

  const { fetchCategoryFilteredProducts, clearFilteredProducts } =
    useTypeDispatch();

  const paginateHandlerBrand = (pageObj) => {
    const page = pageObj.selected + 1;
    const brand = query.brand;
    const brand_id = query.brand_id;
    const feature_value_ids = query.feature_value_ids
      ? query.feature_value_ids
      : "";

    clearFilteredProducts(filteredProducts.meta);
    fetchCategoryFilteredProducts({
      ...params,
      page,
    });
    push(
      {
        pathname: `/brands/[brand]`,
        query: { brand, page, brand_id, feature_value_ids },
      },
      `/brands/${brand}?brand_id=${brand_id}&page=${page}&feature_value_ids=${feature_value_ids}`,
      { shallow: true, scroll: true }
    );
  };

  const paginateHandlerCategory = (pageObj) => {
    const page = pageObj.selected + 1;
    const slug = query.slug;
    const brand_ids = query.brand_ids ? query.brand_ids : "";
    const feature_value_ids = query.feature_value_ids
      ? query.feature_value_ids
      : "";

    clearFilteredProducts(filteredProducts.meta);
    fetchCategoryFilteredProducts({
      ...params,
      category_id: id,
      page,
    });
    push(
      { pathname: `/catalog/[slug]`, query: { slug, page, brand_ids } },
      `/catalog/${slug}?page=${page}&feature_value_ids=${feature_value_ids}&brand_ids=${brand_ids}`,
      { shallow: true, scroll: true } 
    );
  };
  return (
    <>
      {filteredProducts.meta?.total !== 0 ? (
        <ReactPaginate
          marginPagesDisplayed={5} 
          pageRangeDisplayed={2} 
          pageCount={
            filteredProducts.meta && filteredProducts.meta.last_page
              ? filteredProducts.meta.last_page
              : 0
          }
          onPageChange={
            type === "brand" ? paginateHandlerBrand : paginateHandlerCategory
          }
          containerClassName={"listAAA"}
          forcePage={
            filteredProducts.meta?.current_page
              ? filteredProducts.meta?.current_page - 1
              : 0
          }
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item break"}
          breakLinkClassName={"page-link break-link"}
          previousLabel={"<"}
          nextLabel={">"}
        />
      ) : null}
    </>
  );
};

export default Pagination;
