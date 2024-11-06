import React from "react";
import { useGetProductsQuery } from "../Redux/ProductApis";
import Card from "./Card";
import { Flex, Spin } from "antd";
import { Box } from "@mui/material";

function Home() {
  const { data, error, isLoading } = useGetProductsQuery();
  

  return (
    <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {isLoading ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Flex justifyContent="center" alignItems="center">
                <Spin size="large" />
              </Flex>
            </Box>
          ) : (
            data?.products.map((product, index) => (
              <Card key={index} product={product} />
            ))
          )}
          {/* <Card /> */}
        </div>
      </div>
    </section>

    // <Card data={data} error={error} isLoading={isLoading} />
  );
}

export default Home;
