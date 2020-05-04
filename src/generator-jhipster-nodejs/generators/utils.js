/**
 * Copyright 2013-2020 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable no-console */


const jhipsterUtils = require('generator-jhipster/generators/utils');
const _ = require('lodash');
const constants = require('./generator-nodejs-constants');

const path = require('path');
const shelljs = require('shelljs');
const ejs = require('ejs');
const jhiCore = require('jhipster-core');
const fs = require('fs');
const crypto = require('crypto');
const randexp = require('randexp');
const faker = require('faker');
const os = require('os');

const LANGUAGES_MAIN_SRC_DIR = `${__dirname}/languages/templates/${constants.CLIENT_MAIN_SRC_DIR}`;

class RandexpWithFaker extends randexp {
    constructor(regexp, m) {
        super(regexp, m);
        this.max = 5;
    }

    // In order to have consistent results with RandExp, the RNG is seeded.
    randInt(min, max) {
        return faker.random.number({ min, max });
    }
}

module.exports = {
    addEntityToAppModuleImport,
    addEntityToAppModule,
    addControllerToAppModuleImport,
    addControllerToAppModule,
    addServiceToAppModuleImport,
    addServiceToAppModule,
    buildEnumInfo,
    rewrite,
    rewriteFile,
    replaceContent,
    classify,
    rewriteJSONFile,
    copyWebResource,
    renderContent,
    deepFind,
    getJavadoc,
    buildEnumInfo,
    copyObjectProps,
    decodeBase64,
    getAllJhipsterConfig,
    getDBTypeFromDBValue,
    getBase64Secret,
    getRandomHex,
    checkStringInFile,
    checkRegexInFile,
    loadYoRc,
    loadBlueprintsFromConfiguration,
    parseBluePrints,
    normalizeBlueprintName,
    packageNameToNamespace,
    stringHashCode,
    analizeJavadoc,
    RandexpWithFaker,
    gitExec,
    isGitInstalled
};

const SERVER_NODEJS_SRC_DIR = 'server';
/**
 * add entity import to app module
 * @param {any} generator
 * @param {string} entityClass
 * @param {string} entityFileName
 */
function addEntityToAppModuleImport(generator, entityClass, entityFileName) {
    rewriteFile(
        {
            file: `${SERVER_NODEJS_SRC_DIR}/src/app.module.ts`,
            needle: 'jhipster-needle-add-entity-module-to-main-import',
            splicable: [`import { ${entityClass}Module } from './module/${entityFileName}.module';`]
        },
        generator
    );
}


/**
 * add entity module to app module
 * @param {any} generator
 * @param {string} entityClass
 */
function addEntityToAppModule(generator, entityClass) {
    jhipsterUtils.rewriteFile(
        {
            file: `${constants.SERVER_NODEJS_SRC_DIR}/src/app.module.ts`,
            needle: 'jhipster-needle-add-entity-module-to-main',
            splicable: [`${entityClass}Module,`]
        },
        generator
    );
}

/**
 * add controller import to app module
 * @param {any} generator
 * @param {string} controllerClass
 * @param {string} controllerFileName
 */
function addControllerToAppModuleImport(generator, controllerClass, controllerFileName) {
    jhipsterUtils.rewriteFile(
        {
            file: `${constants.SERVER_NODEJS_SRC_DIR}/src/app.module.ts`,
            needle: 'jhipster-needle-add-controller-module-to-main-import',
            splicable: [`import { ${controllerClass}Controller } from './web/rest/${controllerFileName}.controller';`]
        },
        generator
    );
}

/**
 * add controller module to app module
 * @param {any} generator
 * @param {string} controllerClass
 */
function addControllerToAppModule(generator, controllerClass) {
    jhipsterUtils.rewriteFile(
        {
            file: `${constants.SERVER_NODEJS_SRC_DIR}/src/app.module.ts`,
            needle: 'jhipster-needle-add-controller-module-to-main',
            splicable: [`${controllerClass}Controller,`]
        },
        generator
    );
}

/**
 * add service import to app module
 * @param {any} generator
 * @param {string} serviceClass
 * @param {string} serviceFileName
 */
function addServiceToAppModuleImport(generator, serviceClass, serviceFileName) {
    jhipsterUtils.rewriteFile(
        {
            file: `${constants.SERVER_NODEJS_SRC_DIR}/src/app.module.ts`,
            needle: 'jhipster-needle-add-service-module-to-main-import',
            splicable: [`import { ${serviceClass}Service } from './service/${serviceFileName}.service';`]
        },
        generator
    );
}

/**
 * add service module to app module
 * @param {any} generator
 * @param {string} serviceClass
 */
function addServiceToAppModule(generator, serviceClass) {
    jhipsterUtils.rewriteFile(
        {
            file: `${constants.SERVER_NODEJS_SRC_DIR}/src/app.module.ts`,
            needle: 'jhipster-needle-add-service-module-to-main',
            splicable: [`${serviceClass}Service,`]
        },
        generator
    );
}

/**
 * Build an enum object
 * @param {any} field : entity field
 * @param {string} angularAppName
 * @param {string} packageName
 * @param {string} clientRootFolder
 */
function buildEnumInfo(field, angularAppName, packageName, clientRootFolder) {
    const fieldType = field.fieldType;
    field.enumInstance = _.lowerFirst(fieldType);
    const enumInfo = {
        enumName: fieldType,
        enumValues: field.fieldValues.split(',').join(', '),
        enumInstance: field.enumInstance,
        enums: field.fieldValues.replace(/\s/g, '').split(','),
        angularAppName,
        packageName,
        clientRootFolder: clientRootFolder ? `${clientRootFolder}-` : ''
    };
    return enumInfo;
}





/**
 * Rewrite file with passed arguments
 * @param {object} args argument object (containing path, file, haystack, etc properties)
 * @param {object} generator reference to the generator
 */
function rewriteFile(args, generator) {
    args.path = args.path || process.cwd();
    const fullPath = path.join(args.path, args.file);

    args.haystack = generator.fs.read(fullPath);
    const body = rewrite(args);
    generator.fs.write(fullPath, body);
    return args.haystack !== body;
}

/**
 * Replace content
 * @param {object} args argument object
 * @param {object} generator reference to the generator
 */
function replaceContent(args, generator) {
    args.path = args.path || process.cwd();
    const fullPath = path.join(args.path, args.file);

    const re = args.regex ? new RegExp(args.pattern, 'g') : args.pattern;

    const currentBody = generator.fs.read(fullPath);
    const newBody = currentBody.replace(re, args.content);
    generator.fs.write(fullPath, newBody);
    return newBody !== currentBody;
}

/**
 * Escape regular expressions.
 *
 * @param {string} str string
 * @returns {string} string with regular expressions escaped
 */
function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'); // eslint-disable-line
}

/**
 * Normalize line endings.
 * If in Windows is Git autocrlf used then need to replace \r\n with \n
 * to achieve consistent comparison result when comparing strings read from file.
 *
 * @param {string} str string
 * @returns {string} string where CRLF is replaced with LF in Windows
 */
function normalizeLineEndings(str) {
    const isWin32 = os.platform() === 'win32';
    return isWin32 ? str.replace(/\r\n/g, '\n') : str;
}

/**
 * Rewrite using the passed argument object.
 *
 * @param {object} args arguments object (containing splicable, haystack, needle properties) to be used
 * @returns {*} re-written file
 */
function rewrite(args) {
    // check if splicable is already in the body text
    const re = new RegExp(args.splicable.map(line => `\\s*${escapeRegExp(normalizeLineEndings(line))}`).join('\n'));

    if (re.test(normalizeLineEndings(args.haystack))) {
        return args.haystack;
    }

    const lines = args.haystack.split('\n');

    let otherwiseLineIndex = -1;
    lines.forEach((line, i) => {
        if (line.includes(args.needle)) {
            otherwiseLineIndex = i;
        }
    });

    let spaces = 0;
    while (lines[otherwiseLineIndex].charAt(spaces) === ' ') {
        spaces += 1;
    }

    let spaceStr = '';

    // eslint-disable-next-line no-cond-assign
    while ((spaces -= 1) >= 0) {
        spaceStr += ' ';
    }

    lines.splice(otherwiseLineIndex, 0, args.splicable.map(line => spaceStr + line).join('\n'));

    return lines.join('\n');
}

/**
 * Convenient function to convert string into valid java class name
 * Note: _.classify uses _.titleize which lowercase the string,
 * so if the user chooses a proper ClassName it will not rename properly
 *
 * @param string string to 'class'-ify
 * @returns {string} 'class'-ified string
 */
function classify(string) {
    string = string.replace(/[\W_](\w)/g, match => ` ${match[1].toUpperCase()}`).replace(/\s/g, '');
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Rewrite JSON file
 *
 * @param {string} filePath file path
 * @param {function} rewriteFile rewriteFile function
 * @param {object} generator reference to the generator
 */
function rewriteJSONFile(filePath, rewriteFile, generator) {
    const jsonObj = generator.fs.readJSON(filePath);
    rewriteFile(jsonObj, generator);
    generator.fs.writeJSON(filePath, jsonObj, null, 2);
}

/**
 * Copy web resources
 *
 * @param {string} source source
 * @param {string} dest destination
 * @param {regex} regex regex
 * @param {string} type type of resource (html, js, etc)
 * @param {object} generator reference to the generator
 * @param {object} opt options
 * @param {any} template template
 */
function copyWebResource(source, dest, regex, type, generator, opt = {}, template) {
    if (generator.enableTranslation) {
        generator.template(source, dest, generator, opt);
    } else {
        renderContent(source, generator, generator, opt, body => {
            body = body.replace(regex, '');
            switch (type) {
                case 'html':
                    body = replacePlaceholders(body, generator);
                    break;
                case 'js':
                    body = replaceTitle(body, generator);
                    if (dest.endsWith('error.route.ts')) {
                        body = replaceErrorMessage(body, generator);
                    }
                    break;
                case 'jsx':
                    body = replaceTranslation(body, generator);
                    break;
                default:
                    break;
            }
            generator.fs.write(dest, body);
        });
    }
}

/**
 * Render content
 *
 * @param {string} source source
 * @param {object} generator reference to the generator
 * @param {any} context context
 * @param {object} options options
 * @param {function} cb callback function
 */
function renderContent(source, generator, context, options, cb) {
    ejs.renderFile(generator.templatePath(source), context, options, (err, res) => {
        if (!err) {
            cb(res);
        } else {
            generator.error(`Copying template ${source} failed. [${err}]`);
        }
    });
}

/**
 *
 * @param {string} body html body
 * @param {object} generator reference to the generator
 * @returns string with pageTitle replaced
 */
function replaceTitle(body, generator) {
    const regex = /pageTitle[\s]*:[\s]*['|"]([a-zA-Z0-9.\-_]+)['|"]/g;
    return replaceTranslationKeysWithText(body, generator, regex);
}

/**
 *
 * @param {string} body html body
 * @param {object} generator reference to the generator
 * @returns string with pageTitle replaced
 */
function replaceErrorMessage(body, generator) {
    const regex = /errorMessage[\s]*:[\s]*['|"]([a-zA-Z0-9.\-_]+)['|"]/g;
    return replaceTranslationKeysWithText(body, generator, regex);
}

/**
 *
 * @param {string} body html body
 * @param {object} generator reference to the generator
 * @param {object} regex regular expression to find keys
 * @returns string with pageTitle replaced
 */
function replaceTranslationKeysWithText(body, generator, regex) {
    let match;

    // eslint-disable-next-line no-cond-assign
    while ((match = regex.exec(body)) !== null) {
        // match is now the next match, in array form and our key is at index 1, index 1 is replace target.
        const key = match[1];
        const target = key;
        const jsonData = geti18nJson(key, generator);
        const keyValue = jsonData !== undefined ? deepFind(jsonData, key) : undefined;

        body = body.replace(target, keyValue !== undefined ? keyValue : generator.baseName);
    }

    return body;
}

/**
 *
 * @param {string} body html body
 * @param {object} generator reference to the generator
 * @returns string with placeholders replaced
 */
function replacePlaceholders(body, generator) {
    const re = /placeholder=['|"]([{]{2}\s*['|"]([a-zA-Z0-9.\-_]+)['|"][\s][|][\s](translate)\s*[}]{2})['|"]/g;
    let match;

    // eslint-disable-next-line no-cond-assign
    while ((match = re.exec(body)) !== null) {
        // match is now the next match, in array form and our key is at index 2, index 1 is replace target.
        const key = match[2];
        const target = match[1];
        const jsonData = geti18nJson(key, generator);
        const keyValue = jsonData !== undefined ? deepFind(jsonData, key, true) : undefined; // dirty fix to get placeholder as it is not in proper json format, name has a dot in it. Assuming that all placeholders are in similar format

        body = body.replace(target, keyValue !== undefined ? keyValue : '');
    }

    return body;
}

/**
 *
 * @param {string} body html body
 * @param {object} generator reference to the generator
 * @returns string with Translate components replaced
 */
function replaceTranslation(body, generator) {
    const replaceRegex = (re, defultReplaceText) => {
        let match;
        // eslint-disable-next-line no-cond-assign
        while ((match = re.exec(body)) !== null) {
            // match is now the next match, in array form and our key is at index 2, index 1 is replace target.
            const key = match[2];
            const target = match[1];
            const limit = match[4]; // string indicating validation limit (e.g. "{ max: 4 }")
            const jsonData = geti18nJson(key, generator);
            let keyValue = jsonData !== undefined ? deepFind(jsonData, key) : undefined;
            if (!keyValue) {
                keyValue = deepFind(jsonData, key, true); // dirty fix to get placeholder as it is not in proper json format, name has a dot in it. Assuming that all placeholders are in similar format
            }
            if (limit) {
                // Replace "{{ placeholder }}" with numeric limit
                keyValue = keyValue.replace(/{{.+}}/, /{.+:\s(.+)\s}/.exec(limit)[1]);
            }

            body = body.replace(target, keyValue !== undefined ? `"${keyValue}"` : defultReplaceText);
        }
    };

    replaceRegex(/(\{translate\('([a-zA-Z0-9.\-_]+)'(, ?null, ?'.*')?\)\})/g, '""');
    replaceRegex(/(translate\(\s*'([a-zA-Z0-9.\-_]+)'(,\s*(null|\{.*\}),?\s*('.*')?\s*)?\))/g, "''");

    return body;
}

/**
 *
 * @param key i18n key
 * @param {object} generator reference to the generator
 * @returns parsed json file
 */
function geti18nJson(key, generator) {
    const i18nDirectory = `${LANGUAGES_MAIN_SRC_DIR}i18n/en/`;
    const names = [];
    let result;
    const namePrefix = _.kebabCase(key.split('.')[0]);
    if (['entity', 'error', 'footer'].includes(namePrefix)) {
        names.push('global');
        if (namePrefix === 'error') {
            names.push('error');
        }
    } else {
        names.push(namePrefix);
    }
    for (let i = 0; i < names.length; i++) {
        let filename = `${i18nDirectory + names[i]}.json`;
        let render;
        if (!shelljs.test('-f', filename)) {
            filename = `${filename}.ejs`;
            render = true;
        }
        try {
            let file = generator.fs.read(filename);
            file = render ? ejs.render(file, generator, {}) : file;
            file = JSON.parse(file);
            if (result === undefined) {
                result = file;
            } else {
                result = { ...result, ...file };
            }
        } catch (err) {
            generator.log(err);
            generator.log(`Error in file: ${filename}`);
        }
    }
    return result;
}

/**
 *
 * @param obj object to find in
 * @param path path to traverse
 * @param placeholder placeholder
 */
function deepFind(obj, path, placeholder) {
    const paths = path.split('.');
    let current = obj;
    if (placeholder) {
        // dirty fix for placeholders, the json files needs to be corrected
        paths[paths.length - 2] = `${paths[paths.length - 2]}.${paths[paths.length - 1]}`;
        paths.pop();
    }
    for (let i = 0; i < paths.length; ++i) {
        if (current[paths[i]] === undefined) {
            return undefined;
        }
        current = current[paths[i]];
    }
    return current;
}

/**
 * Convert passed block of string to javadoc formatted string.
 *
 * @param {string} text text to convert to javadoc format
 * @param {number} indentSize indent size
 * @returns javadoc formatted string
 */
function getJavadoc(text, indentSize) {
    if (!text) {
        text = '';
    }
    if (text.includes('"')) {
        text = text.replace(/"/g, '\\"');
    }
    let javadoc = `${_.repeat(' ', indentSize)}/**`;
    const rows = text.split('\n');
    for (let i = 0; i < rows.length; i++) {
        javadoc = `${javadoc}\n${_.repeat(' ', indentSize)} * ${rows[i]}`;
    }
    javadoc = `${javadoc}\n${_.repeat(' ', indentSize)} */`;
    return javadoc;
}


function analizeJavadoc(generator) {

    generator.formTabs = [];
    generator.viewTabs = [];
    generator.toStringFields = [];
    generator.listButtons = [];
    generator.listButtonsInDropdown = false;
    generator.viewButtons = [];
    generator.viewButtonsInDropdown = false;
    generator.listTableLayout = [];
    generator.listFilterLayout = [];
    generator.formLayout = [];
    generator.viewLayout = [];

    let generatorJavadoc = generator.javadoc; 

    if(generatorJavadoc) {
        while(generatorJavadoc.indexOf('@') > -1 ) {
            let parameter =  generatorJavadoc.substring(generatorJavadoc.indexOf('@')+1, generatorJavadoc.indexOf('@@'))
                                    .split(" ").join("_*JOIN*_").split("\\n").join("_*JOIN*_").split("_*JOIN*_");
            if(parameter.length > 1) {
                // generator.fields[idx][parameter[0]] = parameter[1].trim();
                if(parameter[0] === "formTab") {
                    let value = parameter[1].trim().split(">")[0].split("<");
                    let fields = value[1].split(",");
                    if(generator.formTabs.indexOf(value[0]) === -1) {
                        generator.formTabs.push(value[0]);
                    }
                    for (idx in generator.fields) { 
                        if(fields.indexOf(generator.fields[idx].fieldName) !== -1 ){
                            generator.fields[idx].formTab = value[0];
                        }
                    }
                    for (idx in generator.relationships) { 
                        if(fields.indexOf(generator.relationships[idx].relationshipName) !== -1 ){
                            generator.relationships[idx].formTab = value[0];
                        }
                    }
                }
                if(parameter[0] === "viewTab") {
                    let value = parameter[1].trim().split(">")[0].split("<");
                    let fields = value[1].split(",");
                    if(generator.viewTabs.indexOf(value[0]) === -1) {
                        generator.viewTabs.push(value[0]);
                    }
                    for (idx in generator.fields) { 
                        if(fields.indexOf(generator.fields[idx].fieldName) !== -1 ){
                            generator.fields[idx].viewTab = value[0];
                        }
                    }
                    for (idx in generator.relationships) { 
                        if(fields.indexOf(generator.relationships[idx].relationshipName) !== -1 ){
                            generator.relationships[idx].viewTab = value[0];
                        }
                    }
                }
                if((["listButtons","viewButtons"]).indexOf(parameter[0]) !== -1) {
                    
                    for (const key in parameter) {
                        if (key > 0) {
                            const ele = parameter[key];
                            let button = {
                                name: ele.trim().substring(0,ele.indexOf("{")),
                                attributes: {}
                            };
                            console.info(parameter[0] + " " + button.name);
                            if(button.name){
                                let attributes = ele.trim().substring(ele.indexOf("{")+1,ele.length-1).split(",");
                                for (const i in attributes) {
                                    button['attributes'][attributes[i].split(":")[0]] = attributes[i].split(":")[1];
                                    if(attributes[i].split(":")[0] === "inDropdown" && attributes[i].split(":")[1] === "true" ){
                                        generator[parameter[0]+'InDropdown'] = true;
                                    }
                                }
                                generator[parameter[0]].push(button);
                            }
                        }
                    }
                }
                if((["listTableLayout","listFilterLayout", "formLayout", "viewLayout", "toStringFields"]).indexOf(parameter[0]) !== -1) {
                    for (const key in parameter) {
                        if (key > 0) {
                            const element = parameter[key];
                            const value = element.trim().split("}")[0].split("{");
                            for (idx in generator.fields) { 
                                if(generator.fields[idx].fieldName === value[0] ){
                                    generator[parameter[0]].push({
                                        name: generator.fields[idx].fieldName,
                                        type: 'field',
                                        entity: generator.fields[idx]
                                    });
                                    if(value.length > 1){
                                        const fields = value[1].split(",");
                                        for (const i in fields) {
                                            const element = fields[i].split(":");
                                            generator.fields[idx][parameter[0]+element[0]] = element[1];
                                        }
                                    } else {
                                        generator.fields[idx][parameter[0]] = true;
                                    }
                                }
                            }
                            for (idx in generator.relationships) { 
                                if(generator.relationships[idx].relationshipName === value[0] ){
                                    generator[parameter[0]].push({
                                        name: generator.relationships[idx].relationshipName,
                                        type: 'relationship',
                                        entity: generator.relationships[idx]
                                    });
                                    if(value.length > 1){
                                        const fields = value[1].split(",");
                                        for (const i in fields) {
                                            const element = fields[i].split(":");
                                            generator.relationships[idx][parameter[0]+element[0]] = element[1];
                                        }
                                    } else {
                                        generator.relationships[idx][parameter[0]] = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            generatorJavadoc = generatorJavadoc.substring(0,generatorJavadoc.indexOf('@')) + generatorJavadoc.substring(generatorJavadoc.indexOf('@@')+2).trim();
        }
    }
    for (idx in generator.fields) { 
        let javadoc = generator.fields[idx].javadoc; 
        generator.fields[idx]['clean_javadoc'] = undefined;
        if(javadoc) {
            while(javadoc.indexOf('@') > -1 ) {
                let parameter =  javadoc.substring(javadoc.indexOf('@')+1, javadoc.indexOf('@@')).split(" ");
                if(parameter.length > 1) {
                    generator.fields[idx][parameter[0]] = parameter[1].trim();
                    if(parameter[0] === "formTab" && generator.formTabs.indexOf(parameter[1].trim()) === -1) {
                        generator.formTabs.push(parameter[1].trim());
                    }
                    if(parameter[0] === "viewTab" && generator.viewTabs.indexOf(parameter[1].trim()) === -1) {
                        generator.viewTabs.push(parameter[1].trim());
                    }
                }
                javadoc = javadoc.substring(0,javadoc.indexOf('@')) + javadoc.substring(javadoc.indexOf('@@')+2).trim();
            }
            generator.fields[idx]['clean_javadoc'] = javadoc;
        }
    } 

    if(generator.formTabs.length > 0){
        generator.defaultFormTab = false;
        for (idx in generator.fields) { 
            if(generator.formTabs.indexOf(generator.fields[idx].formTab) === -1 ){
                generator.defaultFormTab = true;
            }
        }
        for (idx in generator.relationships) { 
            if(generator.formTabs.indexOf(generator.relationships[idx].formTab) === -1 ){
                generator.defaultFormTab = true;
            }
        }
    } else {
        generator.defaultFormTab = true;
    }

    if(generator.viewTabs.length > 0){
        generator.defaultViewTab = false;
        for (idx in generator.fields) { 
            if(generator.viewTabs.indexOf(generator.fields[idx].viewTab) === -1 ){
                generator.defaultViewTab = true;
            }
        }
        for (idx in generator.relationships) { 
            if(generator.viewTabs.indexOf(generator.relationships[idx].viewTab) === -1 ){
                generator.defaultViewTab = true;
            }
        }
    } else {
        generator.defaultViewTab = true;
    }

    // console.info(generator.toStringFields)
    // console.info(generator.listFilterLayout)
      console.info(generator.viewButtons)
    // console.info(generator.viewLayout)

    return generator;
}

function getEnumsWithCustomValue(enums) {
    return enums.reduce((enumsWithCustomValueArray, currentEnumValue) => {
        if (doesTheEnumValueHaveACustomValue(currentEnumValue)) {
            const matches = /([A-Z\-_]+)(\((.+?)\))?/.exec(currentEnumValue);
            const enumValueName = matches[1];
            const enumValueCustomValue = matches[3];
            enumsWithCustomValueArray.push({ name: enumValueName, value: enumValueCustomValue });
        } else {
            enumsWithCustomValueArray.push({ name: currentEnumValue, value: false });
        }
        return enumsWithCustomValueArray;
    }, []);
}

function doesTheEnumValueHaveACustomValue(enumValue) {
    return enumValue.includes('(');
}
/**
 * Copy object props from source to destination
 * @param {*} toObj
 * @param {*} fromObj
 */
function copyObjectProps(toObj, fromObj) {
    // we use Object.assign instead of spread as we want to mutilate the object.
    Object.assign(toObj, fromObj);
}

/**
 * Decode the given string from base64 to said encoding.
 * @param string the base64 string to decode
 * @param encoding the encoding to decode into. default to 'utf-8'
 */
function decodeBase64(string, encoding = 'utf-8') {
    return Buffer.from(string, 'base64').toString(encoding);
}

function loadYoRc(filePath = '.yo-rc.json') {
    if (!jhiCore.FileUtils.doesFileExist(filePath)) {
        return undefined;
    }
    return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
}

/**
 * Get all the generator configuration from the .yo-rc.json file
 * @param {Generator} generator the generator instance to use
 * @param {boolean} force force getting direct from file
 * @param {String} base path where the .yo-rc.json file is located. Default is cwd.
 */
function getAllJhipsterConfig(generator, force, basePath = '') {
    let configuration = generator && generator.config ? generator.config.getAll() || {} : {};
    const filePath = path.join(basePath || '', '.yo-rc.json');
    if ((force || !configuration.baseName) && jhiCore.FileUtils.doesFileExist(filePath)) {
        const yoRc = loadYoRc(filePath);
        configuration = yoRc['generator-jhipster'];
        // merge the blueprint configs if available
        configuration.blueprints = loadBlueprintsFromConfiguration(configuration);
        const blueprintConfigs = configuration.blueprints.map(bp => yoRc[bp.name]).filter(el => el !== null && el !== undefined);
        if (blueprintConfigs.length > 0) {
            const mergedConfigs = Object.assign(...blueprintConfigs);
            configuration = { ...configuration, ...mergedConfigs };
        }
    }
    if (!configuration.get || typeof configuration.get !== 'function') {
        configuration = {
            ...configuration,
            getAll: () => configuration,
            get: key => configuration[key],
            set: (key, value) => {
                configuration[key] = value;
            }
        };
    }
    return configuration;
}

/**
 * Get DB type from DB value
 * @param {string} db - db
 */
function getDBTypeFromDBValue(db) {
    if (constants.SQL_DB_OPTIONS.map(db => db.value).includes(db)) {
        return 'sql';
    }
    return db;
}

/**
 * Get a random hex string
 * @param {int} len the length to use, defaults to 50
 */
function getRandomHex(len = 50) {
    return crypto.randomBytes(len).toString('hex');
}

/**
 * Generates a base64 secret from given string or random hex
 * @param {string} value the value used to get base64 secret
 * @param {int} len the length to use for random hex, defaults to 50
 */
function getBase64Secret(value, len = 50) {
    return Buffer.from(value || getRandomHex(len)).toString('base64');
}

/**
 * Checks if string is already in file
 * @param {string} path file path
 * @param {string} search search string
 * @param {object} generator reference to generator
 * @returns {boolean} true if string is in file, false otherwise
 */
function checkStringInFile(path, search, generator) {
    const fileContent = generator.fs.read(path);
    return fileContent.includes(search);
}

/**
 * Checks if regex is found in file
 * @param {string} path file path
 * @param {regex} regex regular expression
 * @param {object} generator reference to generator
 * @returns {boolean} true if regex is matched in file, false otherwise
 */
function checkRegexInFile(path, regex, generator) {
    const fileContent = generator.fs.read(path);
    return fileContent.match(regex);
}

/**
 * Loads the blueprint information from the configuration of the specified generator.
 * @param config - the generator's configuration object.
 * @returns {Array} an array that contains the info for each blueprint
 */
function loadBlueprintsFromConfiguration(config) {
    // handle both config based on yeoman's Storage object, and direct configuration loaded from .yo-rc.json
    const configuration = config && config.getAll && typeof config.getAll === 'function' ? config.getAll() || {} : config;
    // load blueprints from config file
    const blueprints = configuration.blueprints || [];

    const oldBlueprintName = configuration.blueprint;
    if (oldBlueprintName && blueprints.findIndex(e => e.name === oldBlueprintName) === -1) {
        const version = configuration.blueprintVersion || 'latest';
        blueprints.push(parseBlueprintInfo(`${oldBlueprintName}@${version}`));
    }
    return blueprints;
}

/**
 * Splits and normalizes a comma separated list of blueprint names with optional versions.
 * @param {string} blueprints - comma separated list of blueprint names, e.g kotlin,vuewjs@1.0.1. If an array then
 * no processing is performed and it is returned as is.
 * @returns {Array} an array that contains the info for each blueprint
 */
function parseBluePrints(blueprints) {
    if (blueprints && !Array.isArray(blueprints)) {
        return blueprints
            .split(',')
            .filter(el => el != null && el.length > 0)
            .map(blueprint => parseBlueprintInfo(blueprint));
    }
    return blueprints;
}

/**
 * Normalize blueprint name if needed and also extracts version if defined. If no version is defined then `latest`
 * is used by default.
 * @param {string} blueprint - name of the blueprint and optionally a version, e.g kotlin[@0.8.1]
 * @returns {object} containing the name and version of the blueprint
 */
function parseBlueprintInfo(blueprint) {
    let bpName = normalizeBlueprintName(blueprint);
    let version = 'latest';
    const idx = bpName.lastIndexOf('@');
    if (idx > 0) {
        version = bpName.slice(idx + 1);
        bpName = bpName.slice(0, idx);
    }
    return {
        name: bpName,
        version
    };
}

/**
 * Remove 'generator-' prefix from generators for compatibility with yeoman namespaces.
 * @param {string} packageName - name of the blueprint's package name
 * @returns {string} namespace of the blueprint
 */
function packageNameToNamespace(packageName) {
    return packageName.replace('generator-', '');
}

/**
 * Normalize blueprint name: prepend 'generator-jhipster-' if needed
 * @param {string} blueprint - name of the blueprint
 * @returns {string} the normalized blueprint name
 */
function normalizeBlueprintName(blueprint) {
    if (blueprint && blueprint.startsWith('@')) {
        return blueprint;
    }
    if (blueprint && !blueprint.startsWith('generator-jhipster')) {
        return `generator-jhipster-${blueprint}`;
    }
    return blueprint;
}

/**
 * Calculate a hash code for a given string.
 * @param {string} str - any string
 * @returns {number} returns the calculated hash code.
 */
function stringHashCode(str) {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        const character = str.charCodeAt(i);
        hash = (hash << 5) - hash + character; // eslint-disable-line no-bitwise
        hash |= 0; // eslint-disable-line no-bitwise
    }

    if (hash < 0) {
        hash *= -1;
    }
    return hash;
}

/**
 * Executes a Git command using shellJS
 * gitExec(args [, options, callback])
 *
 * @param {string|array} args - can be an array of arguments or a string command
 * @param {object} options[optional] - takes any of child process options
 * @param {function} callback[optional] - a callback function to be called once process complete, The call back will receive code, stdout and stderr
 * @return {object} when in synchronous mode, this returns a ShellString. Otherwise, this returns the child process object.
 */
function gitExec(args, options = {}, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    if (options.async === undefined) options.async = callback !== undefined;
    if (options.silent === undefined) options.silent = true;
    if (options.trace === undefined) options.trace = true;

    if (!Array.isArray(args)) {
        args = [args];
    }
    const command = `git ${args.join(' ')}`;
    if (options.trace) {
        console.info(command);
    }
    if (callback) {
        return shelljs.exec(command, options, callback);
    }
    return shelljs.exec(command, options);
}

/**
 * Checks if git is installed.
 *
 * @param {function} callback[optional] - function to be called after checking if git is installed. The callback will receive the code of the shell command executed.
 *
 * @return {boolean} true if installed; false otherwise..
 */
function isGitInstalled(callback) {
    const code = gitExec('--version', { trace: false }).code;
    if (callback) callback(code);
    return code === 0;
}
