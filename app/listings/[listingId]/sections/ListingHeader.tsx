"use client";

import Image from "next/image";

import { Listing, User } from "@prisma/client";
import { SafeUser } from "@/app/types";

import { getCategoryByLabel } from "@/app/data/categories";

import { FaBath } from "@react-icons/all-files/fa/FaBath";
import { FaChair } from "@react-icons/all-files/fa/FaChair";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";

import "./ListingHeader.scss";
import Avatar from "@/app/components/uiElements/Avatar";
import HeartButton from "@/app/components/listingElements/HeartButton";


interface ListingHeaderProps {
  listing: Listing & {
    user: User;
  };
  currentUser: SafeUser | null;
  setShowLoginModal:(show:string) => void
}

const ListingHeader: React.FC<ListingHeaderProps> = ({ listing , currentUser,  setShowLoginModal}) => {



  const {
    title,
    description,
    guessCount,
    bathroomCount,
    roomCount,
    category,
    id,
    imageSrc,
    user,
  } = listing;



  const categoryToShow = getCategoryByLabel(category);

  const sentences = description.match(/[^\.!\?]+[\.!\?]+/g);
  const paragraphSize = 4;
  const paragraphs = [];

  if (sentences) {
    for (let i = 0; i < sentences.length; i += paragraphSize) {
      const paragraphSentences = sentences.slice(i, i + paragraphSize);
      const paragraph = paragraphSentences.join(" ");
      paragraphs.push(paragraph);
    }
  }

  return (
    <section className="listing-header">

      <div className="listing-header__image-box">
        <HeartButton listingId={id} currentUser={currentUser} setShowLoginModal={setShowLoginModal} />
        <Image
          src={imageSrc}
          alt={title}
          width={1900}
          height={1200}
          className="listing-header__img"
        />
      </div>
      <div className="listing-header__rooms">
        <div className="listing-header__rooms-icon-box">
          <FaBath />
          <span className="listing-header__rooms-amount">
            {`${bathroomCount} bathrooms`}
          </span>
        </div>
        <div className="listing-header__rooms-icon-box listing-header__rooms-icon-box--user">
          <FaUsers />
          <span className="listing-header__rooms-amount">
            {`${guessCount} guests`}
          </span>
        </div>
        <div className="listing-header__rooms-icon-box">
          <FaChair />
          <span className="listing-header__rooms-amount">
            {`${roomCount} rooms`}
          </span>
        </div>
      </div>
      <h1 className="listing-header__heading">{title}</h1>
      <div className="listing-header__author">
        {user?.image && <Avatar src={user.image} name={user.name} />}
        <span className="listing-header__author-name">{`Hosted by ${user.name}`}</span>
      </div>
      {categoryToShow && (
        <div className="listing-header__category">
          <div className="listing-header__category-left">
            <categoryToShow.icon />
          </div>
          <div className="listing-header__category-right">
            <h3 className="listing-heeader__category-name">
              {categoryToShow.label}
            </h3>
            <p className="listing-header__category-desc">
              {categoryToShow.description}
            </p>
          </div>
        </div>
      )}
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="listing-header__desc">
          {paragraph}
        </p>
      ))}
    </section>
  );
};

export default ListingHeader;
