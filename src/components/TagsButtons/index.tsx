import React, { ReactElement } from "react";
import { useTypedSelector } from "../../hooks";
import Tag from "./Tag";

export default function TagsWrapper(): ReactElement {
  const { tags } = useTypedSelector((state) => state.filtered);
  return (
    <>
      <h3>Tags:</h3>
      <ul className="tags-buttons-wrapper">
        {Object.keys(tags).map((tag) => (
          <Tag
            key={`tag-button-${tag}`}
            tag={tag}
            isActive={tags[tag].isActive}
            isCalculated={tags[tag].isCalculated}
          />
        ))}
      </ul>
    </>
  );
}
