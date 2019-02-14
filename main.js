/*!
 * OLSKDisk
 * Copyright(c) 2018 Rosano Coutinho
 * MIT Licensed
 */

const fsPackage = require('fs');
const pathPackage = require('path');
const mkdirpPackage = require('mkdirp');

//_ OLSKDiskIsRealFolderPath

exports.OLSKDiskIsRealFolderPath = function(inputData) {
	if (!fsPackage.existsSync(inputData)) {
		return false;
	}

	return fsPackage.lstatSync(inputData).isDirectory();
};

//_ OLSKDiskIsRealFilePath

exports.OLSKDiskIsRealFilePath = function(inputData) {
	if (!fsPackage.existsSync(inputData)) {
		return false;
	}

	return fsPackage.lstatSync(inputData).isFile();
};

//_ OLSKDiskCreateFolder

exports.OLSKDiskCreateFolder = function(inputData) {
	if (!fsPackage.existsSync(inputData)) {
		mkdirpPackage.sync(inputData);
	}

	return inputData;
};

//_ OLSKDiskDeleteFolder

exports.OLSKDiskDeleteFolder = function(inputData) {
	if (!fsPackage.existsSync(inputData)) {
		return 0;
	}

	if (!fsPackage.lstatSync(inputData).isDirectory()) {
		return 0;
	}

	fsPackage.readdirSync(inputData).forEach(function(fileName) {
		var currentPath = inputData + '/' + fileName;
		if (fsPackage.lstatSync(currentPath).isDirectory()) {
			exports.OLSKDiskDeleteFolder(currentPath);
		} else {
			fsPackage.unlinkSync(currentPath);
		}
	});

	fsPackage.rmdirSync(inputData);
	return 1;
};

//_ OLSKDiskWriteFile

exports.OLSKDiskWriteFile = function(param1, param2) {
	if (typeof param1 !== 'string') {
		throw new Error('OLSKErrorInputInvalid');
	}

	if (typeof param2 !== 'string') {
		throw new Error('OLSKErrorInputInvalid');
	}

	exports.OLSKDiskCreateFolder(pathPackage.dirname(param1));

	fsPackage.writeFileSync(param1, param2);

	return param1;
};

//_ OLSKDiskReadFile

exports.OLSKDiskReadFile = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('OLSKErrorInputInvalid');
	}

	if (!exports.OLSKDiskIsRealFilePath(inputData)) {
		throw new Error('OLSKErrorInputInvalid');
	}

	return fsPackage.readFileSync(inputData, exports.OLSKDiskDefaultTextEncoding());
};

//_ OLSKDiskAppFolderName

exports.OLSKDiskAppFolderName = function() {
	return 'os-app';
};

//_ OLSKDiskCacheFolderName

exports.OLSKDiskCacheFolderName = function() {
	return 'os-cache';
};

//_ OLSKDiskDataFolderName

exports.OLSKDiskDataFolderName = function() {
	return 'os-data';
};

//_ OLSKDiskPublicFolderName

exports.OLSKDiskPublicFolderName = function() {
	return 'os-public';
};

//_ OLSKDiskWorkspaceTestingFolderName

exports.OLSKDiskWorkspaceTestingFolderName = function() {
	return 'os-workspace-testing';
};

//_ OLSKDiskWorkspaceTestingFolderSubfolderNameFor

exports.OLSKDiskWorkspaceTestingFolderSubfolderNameFor = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('OLSKErrorInputInvalid');
	}

	if (inputData === '') {
		throw new Error('OLSKErrorInputInvalid');
	}

	return ['test', inputData].join('.').replace(/\./g, '-');
};

//_ OLSKDiskLaunchFileName

exports.OLSKDiskLaunchFileName = function() {
	return 'os-launch.js';
};

//_ OLSKDiskDefaultTextEncoding

exports.OLSKDiskDefaultTextEncoding = function() {
	return 'utf8';
};

//_ OLSKDiskSafeBasenameFor

exports.OLSKDiskSafeBasenameFor = function(inputData) {
	if (typeof inputData !== 'string') {
		throw new Error('OLSKErrorInputInvalid');
	}

	return inputData.replace(/[\.,;:\*\?\|_<>\\\/\"\'\“\”\‘\’\«\»]/g, ' ').split(/\s/).filter(function(e) {
		return e.trim() !== '';
	}).join(' ');
};
