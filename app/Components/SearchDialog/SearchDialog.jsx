"use client";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/globalContext";
import { commandIcon } from "@/app/utils/Icons.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Command, CommandInput } from "@/components/ui/command.jsx";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog.jsx";
import React from "react";

function SearchDialog() {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const [hoveredIndex, setHoveredIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false); // add state to track dialog open/close

  const getClickedCoords = (lat, lon) => {
    setActiveCityCoords([lat, lon]);
    setOpen(false); // close the dialog when a location is clicked
  };

  return (
    <div className="search-btn">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100 ease-in-out duration-200"
            onClick={() => setOpen(true)} // open the dialog when clicked
          >
            <p className="text-sm text-muted-foreground">Search Here...</p>
            <div className="command dark:bg-[#262626] bg-slate-200 py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
              {commandIcon}
              <span className="text-[9px]">F</span>
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className="p-0">
          <Command className="rounded-lg border shadow-md">
            <CommandInput
              value={inputValue}
              onChangeCapture={handleInput}
              placeholder="Type a command or search..."
            />
            <ul className="px-3 pb-2">
              <p className="p-2 text-sm text-muted-foreground">Suggestions</p>

              {geoCodedList?.length === 0 || (!geoCodedList && <p>No Results</p>)}

              {geoCodedList &&
                geoCodedList.map((item, index) => {
                  const { country, state, name } = item;
                  return (
                    <li
                      key={index}
                      onMouseEnter={() => setHoveredIndex(index)}
                      className={`py-3 px-2 text-sm rounded-sm cursor-default ${
                        hoveredIndex === index ? "bg-accent" : ""
                      }`}
                      onClick={() => {
                        getClickedCoords(item.lat, item.lon);
                      }}
                    >
                      <p className="text">
                        {name}, {state && state + ","} {country}
                      </p>
                    </li>
                  );
                })}
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SearchDialog;