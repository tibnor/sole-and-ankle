import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'
  let ItemFlag = null
  const JustReleasedFlag = <Flag style={{"--bgcolor": "hsl(0, 0%, 100%)"}}>Just Released</Flag>
  const SaleFlag = <Flag style={{"--bgcolor": "background: hsl(340, 65%, 47%)"}}>Sale</Flag>
  if (variant === "on-sale") {
    ItemFlag = SaleFlag;
  } else if (variant === "new-release") {
    ItemFlag = JustReleasedFlag;
  }

  return (
    <Link href={`/shoe/${slug}`} style={{"--variant": variant}}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant==="on-sale" ? <Flag style={{"--bgcolor": COLORS.primary}}>Sale</Flag>: null }
          {variant==="new-release" ? <Flag style={{"--bgcolor": COLORS.secondary}}>Just Released!</Flag> : null}
          
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price className={salePrice ? "sale" : "" }>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : null }
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  background-color: var(--bgcolor);
  color: ${COLORS.white};
  padding: 7px 9px 9px 11px;
  border-radius: 2px;
  font-family: "Raleway";
  font-weight: 700;
  font-size: ${14/16}rem;
`



const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
  overflow: clip;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  &.sale {
    color: ${COLORS.gray[700]};
    text-decoration: line-through;
  }
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
