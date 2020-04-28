
export class ResourceType {
  transferNumber: number;
  value: string;
  viewValue: string;
  pathDescriptor: string;

  constructor(value: string | number) {
    console.log('constructor:' + value);
    switch (value) {
      case 'SAN': case 'san-0': case 0:
        return {transferNumber: 0, value: 'san-0', viewValue: 'WissData S:', pathDescriptor: 'Pfad:'};
      case 'LOCAL': case 'local-1': case 1:
        return {transferNumber: 1, value: 'local-1', viewValue: 'Lokal', pathDescriptor: 'Pfad:'};
      case 'OPENBIS': case 'openbis-2': case 2:
        return  {transferNumber: 2, value: 'openbis-2', viewValue: 'OpenBIS', pathDescriptor: 'ID:'};
      case 'GIT': case 'git-3': case 3:
        return {transferNumber: 3, value: 'git-3', viewValue: 'Git Repositorium', pathDescriptor: 'URL:'};
      case 'DOI': case 'doi-4': case 4:
        return {transferNumber: 4, value: 'doi-4', viewValue: 'DOI Referenz', pathDescriptor: 'DOI:'};

    }
}
}
