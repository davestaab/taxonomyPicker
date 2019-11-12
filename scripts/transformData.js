import compose from "lodash/fp/compose";
import map from "lodash/fp/map";
import filter from "lodash/fp/filter";
import includes from "lodash/fp/includes";
import prop from "lodash/fp/prop";
import replace from "lodash/fp/replace";
import sortBy from "lodash/fp/sortBy";
import fs from "fs";

import rawData from "../src/data/taxonomy-raw"

const wrapData = d => {
    return {
        "ArrayOfProgram": {
            "Program": d
        }
    }
}
const cleanComment = replace('Secondary Taxonomy - ', '')
const sortByOptionThenOrder = d => d.OPTION_NO + d.ORDER_NO
const convertFormat = (d) => {
    const {DESCRIPTION, COMMENTS, OPTION_NO, ORDER_NO } = d
    const id = OPTION_NO + ORDER_NO

    return {
        Category: cleanComment(COMMENTS),
        ProgramTitle: DESCRIPTION,
        Path: id,
        ProjectSponsorId: id,
        IsActive: "true",
        IsIndirect: "false",
        IsLeaf: "true",
        Level: "1",
        "ProgramManagers": {
            "ProgramManager": []
        },
        "ParentProjectSponsorId": {"-i:nil": "true"},
        "RootProjectSponsorId": {"-i:nil": "true"}
    }
}
/**
 * Take proposal taxonomy data and convert it to the format for the program taxonomy picker demo app
 */
const transform = compose(
    wrapData,
    map(convertFormat),
    sortBy(sortByOptionThenOrder),
    filter(compose(
        includes('Secondary Taxonomy'),
        prop('COMMENTS')
    ))
)

const transformedData = transform(rawData)
fs.writeFileSync('./src/data/pslTaxonomyData.json', JSON.stringify(transformedData))

