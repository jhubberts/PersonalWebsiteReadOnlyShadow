import React, {useState} from 'react';
import ChordExplorer from "../ChordExplorer";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import GuitarFingering from "../GuitarFingering/GuitarFingering";
import { Synth } from "../GuitarUtil";

const chordToRenderable = (chord) => {
    const annotations = ["", "", "", "", "", ""];
    for(let i = 0; i < 6; i++) {
        if (chord.notes[i] != null) {
            annotations[i] = `(${chord.notes[i].name}/${chord.intervals[i]})`
        }
    }

    return {
        chord: {
            singles: chord.singles || [],
            barres: chord.barres || []
        },
        annotations: annotations,
        title: chord.canonicalName
    }
}

const ChordLibraryPage = () => {
    const [activeChord, setActiveChord] = useState(null);

    const audioContext = new AudioContext();
    const synth = new Synth({audioContext: audioContext});

    const createOnClick = (chord) => {
        return () => {
            synth.playChordForXSeconds(chord, 1)
        }
    }

    const createOnMouseOverNote = (chord) => {
        return (note) => {
            synth.playNoteForXSeconds(chord.notes[6 - note.string], 1)
        }
    }

    return (
        <Box m={2}>
            <Grid container direction="row" spacing={5}>
                <Grid item xs={3}>
                    <ChordExplorer onSelection={(chord) => setActiveChord(chord)}/>
                </Grid>
                {activeChord != null &&
                <Grid item xs={9} align={"left"}>
                    <GuitarFingering width={500} {...chordToRenderable(activeChord)} onMouseOverNote={createOnMouseOverNote(activeChord)} onClick={createOnClick(activeChord)}/>
                </Grid>}
            </Grid>
        </Box>
    )
}

export default ChordLibraryPage;