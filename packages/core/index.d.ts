// Originally from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/@rjsf/core/index.d.ts

declare module '@rjsf/core' {
    import * as React from 'react';
    import { JSONSchema7, JSONSchema7Definition, JSONSchema7Type, JSONSchema7TypeName } from 'json-schema';

    type ErrorSchema = {
        [k: string]: ErrorSchema;
    };

    export interface FormProps<T> {
        schema: JSONSchema7;
        disabled?: boolean;
        uiSchema?: UiSchema;
        formData?: T;
        formContext?: any;
        widgets?: { [name: string]: Widget };
        fields?: { [name: string]: Field };
        noValidate?: boolean;
        noHtml5Validate?: boolean;
        showErrorList?: boolean;
        ErrorList?: React.StatelessComponent<ErrorListProps>;
        validate?: (formData: T, errors: FormValidation) => FormValidation;
        onBlur?: (id: string, value: boolean | number | string | null) => void;
        onChange?: (e: IChangeEvent<T>, es?: ErrorSchema) => any;
        onError?: (e: any) => any;
        onSubmit?: (e: ISubmitEvent<T>) => any;
        liveValidate?: boolean;
        FieldTemplate?: React.StatelessComponent<FieldTemplateProps>;
        ArrayFieldTemplate?: React.StatelessComponent<ArrayFieldTemplateProps>;
        ObjectFieldTemplate?: React.StatelessComponent<ObjectFieldTemplateProps>;
        safeRenderCompletion?: boolean;
        transformErrors?: (errors: AjvError[]) => AjvError[];
        idPrefix?: string;
        additionalMetaSchemas?: ReadonlyArray<object>;
        customFormats?: { [k: string]: string | RegExp | ((data: string) => boolean) };
        // HTML Attributes
        id?: string;
        className?: string;
        name?: string;
        method?: string;
        target?: string;
        action?: string;
        autocomplete?: string;
        enctype?: string;
        acceptcharset?: string;
        omitExtraData?: boolean;
        liveOmit?: boolean;
        tagName?: keyof JSX.IntrinsicElements | React.ComponentType;
    }

    export default class Form<T> extends React.Component<FormProps<T>> {
        validate: (
            formData: T,
            schema?: FormProps<T>['schema'],
            additionalMetaSchemas?: FormProps<T>['additionalMetaSchemas'],
            customFormats?: FormProps<T>['customFormats'],
        ) => { errors: AjvError[]; errorSchema: ErrorSchema };
        onChange: (formData: T, newErrorSchema: ErrorSchema) => void;
        onBlur: (id: string, value: boolean | number | string | null) => void;
        submit: () => void;
    }

    export type UiSchema = {
        'ui:field'?: Field | string;
        'ui:widget'?: Widget | string;
        'ui:options'?: { [key: string]: boolean | number | string | object | any[] | null };
        'ui:order'?: string[];
        'ui:FieldTemplate'?: React.StatelessComponent<FieldTemplateProps>;
        'ui:ArrayFieldTemplate'?: React.StatelessComponent<ArrayFieldTemplateProps>;
        'ui:ObjectFieldTemplate'?: React.StatelessComponent<ObjectFieldTemplateProps>;
        [name: string]: any;
    };

    export type FieldId = {
        $id: string;
    };

    export type IdSchema<T = any> = {
        [key in keyof T]: IdSchema<T[key]>;
    } &
        FieldId;

    export type FieldPath = {
        $name: string;
    };

    export type PathSchema<T = any> = {
        [key in keyof T]: PathSchema<T[key]>;
    } &
        FieldPath;

    export interface WidgetProps
        extends Pick<
            React.HTMLAttributes<HTMLElement>,
            Exclude<keyof React.HTMLAttributes<HTMLElement>, 'onBlur' | 'onFocus'>
        > {
        id: string;
        schema: JSONSchema7;
        value: any;
        required: boolean;
        disabled: boolean;
        readonly: boolean;
        autofocus: boolean;
        onChange: (value: any) => void;
        options: { [key: string]: boolean | number | string | object | null };
        formContext: any;
        onBlur: (id: string, value: boolean | number | string | null) => void;
        onFocus: (id: string, value: boolean | number | string | null) => void;
        label: string;
        multiple: boolean;
    }

    export type Widget = React.StatelessComponent<WidgetProps> | React.ComponentClass<WidgetProps>;

    export interface FieldProps<T = any>
        extends Pick<React.HTMLAttributes<HTMLElement>, Exclude<keyof React.HTMLAttributes<HTMLElement>, 'onBlur'>> {
        schema: JSONSchema7;
        uiSchema: UiSchema;
        idSchema: IdSchema;
        formData: T;
        errorSchema: ErrorSchema;
        onChange: (e: IChangeEvent<T> | any, es?: ErrorSchema) => any;
        onBlur: (id: string, value: boolean | number | string | null) => void;
        registry: {
            fields: { [name: string]: Field };
            widgets: { [name: string]: Widget };
            definitions: { [name: string]: any };
            formContext: any;
        };
        formContext: any;
        autofocus: boolean;
        disabled: boolean;
        readonly: boolean;
        required: boolean;
        name: string;
        [prop: string]: any;
    }

    export type Field = React.StatelessComponent<FieldProps> | React.ComponentClass<FieldProps>;

    export type FieldTemplateProps = {
        id: string;
        classNames: string;
        label: string;
        description: React.ReactElement;
        rawDescription: string;
        children: React.ReactElement;
        errors: React.ReactElement;
        rawErrors: string[];
        help: React.ReactElement;
        rawHelp: string;
        hidden: boolean;
        required: boolean;
        readonly: boolean;
        disabled: boolean;
        displayLabel: boolean;
        fields: Field[];
        schema: JSONSchema7;
        uiSchema: UiSchema;
        formContext: any;
    };

    export type ArrayFieldTemplateProps<T = any> = {
        DescriptionField: React.StatelessComponent<{ id: string; description: string | React.ReactElement }>;
        TitleField: React.StatelessComponent<{ id: string; title: string; required: boolean }>;
        canAdd: boolean;
        className: string;
        disabled: boolean;
        idSchema: IdSchema;
        items: {
            children: React.ReactElement;
            className: string;
            disabled: boolean;
            hasMoveDown: boolean;
            hasMoveUp: boolean;
            hasRemove: boolean;
            hasToolbar: boolean;
            index: number;
            onDropIndexClick: (index: number) => (event: any) => void;
            onReorderClick: (index: number, newIndex: number) => (event: any) => void;
            readonly: boolean;
            key: string;
        }[];
        onAddClick: (event: any) => (event: any) => void;
        readonly: boolean;
        required: boolean;
        schema: JSONSchema7;
        uiSchema: UiSchema;
        title: string;
        formContext: any;
        formData: T;
        registry: FieldProps['registry'];
    };

    export type ObjectFieldTemplateProps<T = any> = {
        DescriptionField: React.StatelessComponent<{ id: string; description: string | React.ReactElement }>;
        TitleField: React.StatelessComponent<{ id: string; title: string; required: boolean }>;
        title: string;
        description: string;
        properties: {
            content: React.ReactElement;
            name: string;
            disabled: boolean;
            readonly: boolean;
        }[];
        required: boolean;
        schema: JSONSchema7;
        uiSchema: UiSchema;
        idSchema: IdSchema;
        formData: T;
        formContext: any;
    };

    export type AjvError = {
        message: string;
        name: string;
        params: any;
        property: string;
        stack: string;
    };

    export type ErrorListProps = {
        errorSchema: FormValidation;
        errors: AjvError[];
        formContext: any;
        schema: JSONSchema7;
        uiSchema: UiSchema;
    };

    export interface IChangeEvent<T = any> {
        edit: boolean;
        formData: T;
        errors: AjvError[];
        errorSchema: FormValidation;
        idSchema: IdSchema;
        schema: JSONSchema7;
        uiSchema: UiSchema;
        status?: string;
    }

    export type ISubmitEvent<T> = IChangeEvent<T>;

    export type FieldError = string;

    type FieldValidation = {
        __errors: FieldError[];
        addError: (message: string) => void;
    };

    type FormValidation = FieldValidation & {
        [fieldName: string]: FieldValidation;
    };

    type FormSubmit<T = any> = {
        formData: T;
    };

    export type ThemeProps<T = any> = Omit<FormProps<T>, 'schema'>;

    export function withTheme<T = any>(
        themeProps: ThemeProps<T>,
    ): React.ComponentClass<FormProps<T>> | React.StatelessComponent<FormProps<T>>;

    export type AddButtonProps = {
        className: string;
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
        disabled: boolean;
    };

    export module utils {

        export const ADDITIONAL_PROPERTY_FLAG: string;
    
        export function getDefaultRegistry(): FieldProps['registry'];
    
        export function getSchemaType(schema: JSONSchema7): string;
    
        export function getWidget(
            schema: JSONSchema7,
            widget: Widget,
            registeredWidgets?: { [name: string]: Widget },
        ): Widget | Error;
    
        export function hasWidget(
            schema: JSONSchema7,
            widget: Widget,
            registeredWidgets?: { [name: string]: Widget },
        ): boolean;
    
        export function computeDefaults<T = any>(
            schema: JSONSchema7,
            parentDefaults: JSONSchema7['default'][],
            definitions: FieldProps['registry']['definitions'],
            rawFormData?: T,
            includeUndefinedValues?: boolean,
        ): JSONSchema7['default'][];
    
        export function getDefaultFormState<T = any>(
            schema: JSONSchema7,
            formData: T,
            definitions?: FieldProps['registry']['definitions'],
            includeUndefinedValues?: boolean,
        ): T | JSONSchema7['default'][];
    
        export function getUiOptions(uiSchema: UiSchema): UiSchema['ui:options'];
    
        export function isObject(thing: any): boolean;
    
        export function mergeObjects(obj1: object, obj2: object, concatArrays?: boolean): object;
    
        export function asNumber(value: string | null): number | string | undefined | null;
    
        export function orderProperties(properties: [], order: []): [];
    
        export function isConstant(schema: JSONSchema7): boolean;
    
        export function toConstant(schema: JSONSchema7): JSONSchema7Type | JSONSchema7['const'] | Error;
    
        export function isSelect(_schema: JSONSchema7, definitions?: FieldProps['registry']['definitions']): boolean;
    
        export function isMultiSelect(schema: JSONSchema7, definitions?: FieldProps['registry']['definitions']): boolean;
    
        export function isFilesArray(
            schema: JSONSchema7,
            uiSchema: UiSchema,
            definitions?: FieldProps['registry']['definitions'],
        ): boolean;
    
        export function isFixedItems(schema: JSONSchema7): boolean;
    
        export function allowAdditionalItems(schema: JSONSchema7): boolean;
    
        export function optionsList(schema: JSONSchema7): { label: string; value: string }[];
    
        export function guessType(value: any): JSONSchema7TypeName;
    
        export function stubExistingAdditionalProperties<T = any>(
            schema: JSONSchema7,
            definitions?: FieldProps['registry']['definitions'],
            formData?: T,
        ): JSONSchema7;
    
        export function resolveSchema<T = any>(
            schema: JSONSchema7Definition,
            definitions?: FieldProps['registry']['definitions'],
            formData?: T,
        ): JSONSchema7;
    
        export function retrieveSchema<T = any>(
            schema: JSONSchema7Definition,
            definitions?: FieldProps['registry']['definitions'],
            formData?: T,
        ): JSONSchema7;
    
        export function deepEquals<T>(a: T, b: T): boolean;
    
        export function shouldRender(comp: React.Component, nextProps: any, nextState: any): boolean;
    
        export function toIdSchema<T = any>(
            schema: JSONSchema7Definition,
            id: string,
            definitions: FieldProps['registry']['definitions'],
            formData?: T,
            idPredix?: string,
        ): IdSchema | IdSchema[];
    
        export function toPathSchema<T = any>(
            schema: JSONSchema7Definition,
            name: string | undefined,
            definitions: FieldProps['registry']['definitions'],
            formData?: T,
        ): PathSchema | PathSchema[];
    
        export interface DateObject {
            year: number;
            month: number;
            day: number;
            hour: number;
            minute: number;
            second: number;
        }
    
        export function parseDateString(dateString: string, includeTime?: boolean): DateObject;
    
        export function toDateString(dateObject: DateObject, time?: boolean): string;
    
        export function pad(num: number, size: number): string;
    
        export function setState(instance: React.Component, state: any, callback: Function): void;
    
        export function dataURItoBlob(dataURI: string): { name: string; blob: Blob };
    
        export interface IRangeSpec {
            min?: number;
            max?: number;
            step?: number;
        }
    
        export function rangeSpec(schema: JSONSchema7): IRangeSpec;
    
        export function getMatchingOption(
            formData: any,
            options: JSONSchema7[],
            definitions: FieldProps['registry']['definitions'],
        ): number;
    }
}

declare module '@rjsf/core/lib/components/fields/SchemaField' {
    import { JSONSchema7 } from 'json-schema';
    import { FieldProps, UiSchema, IdSchema, FormValidation } from '@rjsf/core';

    export type SchemaFieldProps<T = any> = Pick<
        FieldProps<T>,
        'schema' | 'uiSchema' | 'idSchema' | 'formData' | 'errorSchema' | 'registry' | 'formContext'
    >;

    export default class SchemaField extends React.Component<SchemaFieldProps> {}
}

declare module '@rjsf/core/lib/validate' {
    import { JSONSchema7Definition } from 'json-schema';
    import { AjvError, ErrorSchema, FormProps } from '@rjsf/core';

    export default function validateFormData<T = any>(
        formData: T,
        schema: JSONSchema7Definition,
        customValidate?: FormProps<T>['validate'],
        transformErrors?: FormProps<T>['transformErrors'],
        additionalMetaSchemas?: FormProps<T>['additionalMetaSchemas'],
        customFormats?: FormProps<T>['customFormats'],
    ): { errors: AjvError[]; errorSchema: ErrorSchema };
}