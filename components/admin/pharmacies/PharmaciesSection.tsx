"use client";

import React, { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { PharmacyCard } from "@/components/common/PharmacyCard";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchAllPharmacies } from "@/services/adminServices";
import { PharmacyCardProps } from "@/utils/types";
import { setIsLoading } from "@/store/features/global/globalSlice";

const PharmaciesSection = () => {
  const dispatch = useDispatch();
  const { pharmacies } = useSelector((state: RootState) => state.pharmacy);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchAllPharmacies(dispatch).then(() => {
        dispatch(setIsLoading(false));
      });
    }
  }, []);

  return (
    <div className="p-6 pt-8 pb-9 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
        <h1 className="text-lg md:text-2xl">Pharmacies</h1>
        <div className="relative w-[390px] sm:max-w-md">
          <Input
            name="email"
            placeholder="Search Pharmacy"
            className="h-[42px] border-none shadow-lg rounded-lg font-medium"
          />
          <span className="absolute right-3 top-2.5 text-gray-500 cursor-pointer">
            <IoSearch className="w-5 h-5" />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pharmacies.length > 0 &&
          pharmacies.map((pharmacy: PharmacyCardProps, index: number) => (
            <PharmacyCard key={index} pharmacy={pharmacy} />
          ))}
      </div>
    </div>
  );
};

export default PharmaciesSection;
