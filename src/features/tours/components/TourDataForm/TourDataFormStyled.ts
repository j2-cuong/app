import styled, {css} from "styled-components";

export const TourFormWrapSection = styled.div`
    width: 100%;
    max-width: 750px;
    margin: auto;
`

const TourFormContentBase = css`
    display: grid;
    width: 100%;
`

export const TourFormContent7030 = styled.div`
    ${TourFormContentBase}
    grid-template-columns: 70% 30%;
    gap: 15px;
`

export const TourFormContent4315 = styled.div`
    ${TourFormContentBase}
    grid-template-columns: 40% 30% 15% 15%;
    gap: 5px;
`

export const TourFormContent5050 = styled.div`
    ${TourFormContentBase}
    grid-template-columns: 50% 50%;
    gap: 15px;
`

export const TourFormContent333 = styled.div`
    ${TourFormContentBase}
    grid-template-columns: 33% 33% 33%;
    gap: 10px;
`

export const TourAddingWrapContent = styled.div`
    width: 100%;
    text-align: center;
    max-width: 600px;
    margin: auto;
`

export const TourAddingSection = styled.div`
    position : relative;
`

export const IconDeleteSection = styled.div`
    position : absolute;
    right: -30px;
    top: 35px;
`

export const ButtonWrap = styled.div`
    text-align: right;
`

// Booking CSS

export const BookingSection = styled.div`
    width: 100%;
    margin: auto;
`

export const BookingWrapContent = styled.div`
    width: 100%;
    text-align: left;
    margin: auto;
`
export const BookingContent20 = styled.div`
    ${TourFormContentBase}
    grid-template-columns: 25% 25% 25% 25% ;
    gap: 1%;
    }
`

export const BookingContent15 = styled.div`
    ${TourFormContentBase}
    grid-template-columns: 20% 20% 20% 15% 15% ;
    gap: 15px;
    max-width: 100% !important;
`

export const BookingIconDeleteSection = styled.div`
    position : absolute;
    right: 0px;
    top: 35px;
`