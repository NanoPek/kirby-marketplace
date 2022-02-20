import React from 'react'


const NFTImage = ({selectedNft}) => {


    return (
        <div>
            <div>
                <img src={selectedNft?.metadata.image} alt={""} />
            </div>
        </div>
    )
}

export default NFTImage