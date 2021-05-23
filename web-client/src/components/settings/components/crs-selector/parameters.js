import settings from '../../../../core/converter/settings';

const common = {
    title: ' coordinate reference system'
};

export const source = {
    title:('Source'+common.title),
    code: settings?.source?.code,

};

export const target = {
    title:('Target'+common.title),
    code: settings?.target?.code,
};