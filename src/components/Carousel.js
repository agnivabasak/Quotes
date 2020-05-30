import * as React from "react";
import {Text,View,StyleSheet} from "react-native";
import CarouselCard from "./CarouselCard";
let QuotesList = [{"_id":{"$oid":"5ecbace828a20383694c8c46"},"Auther":"A. A. Milne","quote":"\"If you live to be a hundred"},
{"_id":{"$oid":"5ecbace828a20383694c8c47"},"Auther":"A. A. Milne","quote":"\"Promise me you'll always remember: You're braver than you believe"}
,{"_id":{"$oid":"5ecbace828a20383694c8c48"},"Auther":"A. A. Milne","quote":"\"Did you ever stop to think"},
{"_id":{"$oid":"5ecbace828a20383694c8c49"}, "Auther":"A. A. Milne","quote":"\"Organizing is what you do before you do something"}
,{"_id":{"$oid":"5ecbace828a20383694c8c4a"},"Auther":"A. A. Milne","quote":"\"Weeds are flowers too"}];

export default function Carousel ({opacities}){
    return <View style={styles.carousel}>
        {QuotesList.map((item,index)=>{
           return index!=0? <CarouselCard key={index} opacity = {opacities[index]} quote = {item.quote.substr(1)} author = {item.Auther} id= {item._id.$oid} beg ={false}/> : <CarouselCard quote = {item.quote.substr(1)} opacity={opacities[index]} author = {item.Auther} id= {item._id.$oid} beg={true}/> ;
        })}
    </View>
}

let styles=StyleSheet.create({
    carousel : {
        flexDirection :"row",
        
    }
})