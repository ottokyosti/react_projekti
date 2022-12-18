import * as React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function Information(props) {
    return(
        <Box>
            <h1 className="h1title">React-osuuden projektityö</h1>
            <h3 className="author">Tekijä: Otto Kyösti</h3>
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                <Box sx={{ marginX: 5}}>
                    <h2 className="h2title">Käyttöohjeet</h2>
                    <Paper elevation={5} sx={{ width: 500, p: 2 }}>
                        <p className="infotext">
                            Nettisivua ohjataan ylhäällä näkyvistä navigaatio painikkeista, mutta
                            eri sivujen välillä pystyy myös kulkemaan selaimen nuolia käyttäen.
                        </p>
                        <h3 className="middleTitle">Main page</h3>
                        <p className="infotext">
                            Pääsivu on nettisivun oletusikkuna. Pääsivulla oletuksena näkee
                            kaikki kontekstit ja niiden sisällä/alla olevat tehtävät. Konteksteja
                            pystyy näyttämään yksi kerrallaan tai kaikki kerrallaan valitsemalla joko 
                            kontekstin nimen tai "Kaikki" sivun oikeassa laidassa olevasta menusta. 
                            Painamalla "Only tasks"-nappulaa sivun oikeassa reunassa lajitteluvalikon 
                            alapuolella saa näkymän vaihtumaan pelkästään tehtäväkortteihin, joiden 
                            järjestystä voi vaihtaa painamalla nuolta joko vasemmalle tai oikealle. 
                            Tässä näkymässä ei voi tehtäväkortteja lajitella. Takaisin oletusnäkymään 
                            pääsee painamalla "Only tasks"-nappulan tilalla olevaa "With contexts"-nappulaa.
                        </p>
                        <h3 className="middleTitle">Task Control</h3>
                        <p className="infotext">
                            "Task Control"-sivulla voi lisätä ja poistaa konteksteja, sekä lisätä, poistaa ja 
                            muokata tehtäviä.
                        </p>
                        <p className="infotext">
                            <b>"Add context"</b>-nappulalla voi lisätä uuden kontekstin tietokantaan 
                            antamalla sille minkä tahansa otsikon (tyhjää otsoikkoa ei voi antaa).
                        </p>    
                        <p className="infotext">
                            <b>"Delete context"</b>-nappulalla voi poistaa kontekstin valitsemalla 
                            yhden kaikkien kontekstien listasta.
                        </p>
                        <p className="infotext">
                            <b>"Add task"</b>-nappulalla voi lisätä uuden tehtävän tietokantaan. Tehtävälle
                            pitää antaa jonkinlainen otsikko ja sille pitää valita kontekstit, joiden alle
                            tehtävä tulee. Otsikko ei saa olla tyhjä ja tehtävälle on valittava vähintään yksi
                            konteksti.
                        </p>
                        <p className="infotext">
                            <b>"Delete task"</b>-nappulalla voi poistaa tehtäviä tietokannasta yksi kerrallaan.
                            Poistettava tehtävä tulee valita kaikkien tehtävien nimien listasta.
                        </p>
                        <p className="infotext">
                            <b>"Edit task"</b>-nappulalla voi muokata jo olemassa olevan tehtävän nimeä ja konteksteja. 
                            Ensiksi pitää valita muokattavan tehtävän nimi valikosta, jonka jälkeen sille voi antaa 
                            uuden nimen ja valita mielivaltaisesti kontekstit. Otsikkoa ei voi jättää tyhjäksi ja 
                            tehtävällä pitää olla vähintään yksi konteksti.
                        </p>
                    </Paper>
                </Box>
                <Box sx={{ marginX: 5}}>
                    <h2 className="h2title">Käytetyt ulkoiset lähteet</h2>
                    <Paper elevation={5} sx={{ width: 500, p: 2 }}>
                    <h3>Material UI</h3>
                        <p className="infotext">
                            Nettisivu on rakennettu suurimmaksi osaksi <a href="https://mui.com/" target="_blank" rel="noreferrer">Material UI</a> komponentteja käyttäen.
                            Nettisivulla on käytetty sekä Material UI komponentteja, että Material UI ikoneja. 
                            Material UI on ilmainen avoimen lähdekoodin komponenttikirjasto. 
                        </p>
                    <h3 className="middleTitle">axios</h3>
                        <p className="infotext">
                            Material UI:n lisäksi nettisivulla on käytetty <a href="https://axios-http.com/docs/intro" target="_blank" rel="noreferrer">axiosta</a> tietokannan 
                            datan hakemiseen ja lisäämiseen.
                        </p>
                    <h3 className="middleTitle">Media</h3>
                        <p className="infotext">
                            Nettisivulla ei ole käytetty ulkoisista lähteistä haettuja kuvia tai videoita. 
                        </p>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
}

export default Information;