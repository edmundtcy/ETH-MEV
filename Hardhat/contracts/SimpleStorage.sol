// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SimpleStorage{
    uint256 favoriteNumber;
    //Indexing is used to make the event searchable
    //Index = topic, no need ABI to decode
    event storedNumber(
        uint256 indexed oldNumber,
        uint256 indexed newNumber,
        uint256 addedNumber,
        address sender
    );

    function store(uint256 newFavouriteNumber)public {
        //Store the number
        //Emit the event
        emit storedNumber(
            favoriteNumber, 
            newFavouriteNumber, 
            newFavouriteNumber + favoriteNumber, 
            msg.sender
        );
        favoriteNumber = newFavouriteNumber;
    }
}
