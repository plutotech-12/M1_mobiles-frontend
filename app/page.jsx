"use client";

import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";
import ProductRow from "../components/ProductRow";

export default function Page() {
  return (
    <>
      <Hero />

      {/* PHONES */}
      <ProductSection title="Phones">
        <ProductRow title="New" category="Phones" condition="New" rows={2} />
        <ProductRow title="Like New" category="Phones" condition="Like New" rows={2} />
        <ProductRow title="Demo / Open Box" category="Phones" condition="Demo-OpenBox" rows={2} />
        <ProductRow title="Refurbished" category="Phones" condition="Refurbished" rows={2} />
      </ProductSection>

      {/* TABLETS */}
      <ProductSection title="Tablets">
        <ProductRow title="New" category="Tablets" condition="New" rows={2} />
        <ProductRow title="Like New" category="Tablets" condition="Like New" rows={2} />
        <ProductRow title="Demo / Open Box" category="Tablets" condition="Demo-OpenBox" rows={2} />
        <ProductRow title="Refurbished" category="Tablets" condition="Refurbished" rows={2} />
      </ProductSection>

      {/* ACCESSORIES */}
      <ProductSection title="Accessories">
        <ProductRow category="Accessories" rows={2} />
      </ProductSection>

      {/* HOME APPLIANCES */}
      <ProductSection title="Home Appliances">
        <ProductRow title="Smart TVs" category="Home Appliances" condition="Smart TV" rows={1} />
        <ProductRow title="AC" category="Home Appliances" condition="AC" rows={1} />
        <ProductRow title="Speakers" category="Home Appliances" condition="Speakers" rows={1} />
        <ProductRow title="Cookware & Induction" category="Home Appliances" condition="Cookware" rows={1} />
      </ProductSection>
    </>
  );
}
