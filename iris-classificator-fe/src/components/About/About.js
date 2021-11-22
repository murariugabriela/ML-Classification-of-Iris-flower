import React from 'react';
import '../../custom.css';
import "./about.css"

export default function About() {
    return (
        <div className="page-bg">
            <h1>About</h1>
            <div className={"flowersBG"}>
                <img className={"flowerPic"} src={"/svg.svg"} alt={"flower-bg"}/>

                <p style={{textAlign: "justify", padding: "30px 20%"}}>
                    Iris flower dataset has several attributes, such as the number of petals, sepals length, sepals
                    widths,
                    etc. All the flowers can be classified into one of the species from Virginica, Setosa, or
                    Versicolor.
                    This project aims to develop a machine learning model to classify the flowers into the
                    above-mentioned
                    species.

                    Iris flower dataset does not need to be preprocessed. You can download the dataset for this project
                    here. Moreover, you can use a number of data science tools for this project, such as R.

                    It takes only a few minutes to develop the model if you are aware of the basic classification
                    concepts
                    and algorithms in machine learning.
                </p>
                <img className={"flowerPic2"} src={"/svg.svg"} alt={"flower-bg"}/>

            </div>
        </div>
    );
}
