import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Mgo+DSMBaFt/QHRqVVhkVFpAaVtdX2NLfUN/T2JRdV50ZDU7a15RRnVfQV1mS39SfkVnXnlXcQ==;Mgo+DSMBPh8sVXJ0S0J+XE9AflRGQmdWfFN0RnNQdV94flVCcDwsT3RfQF5jSn5WdERiUX9ad3xQRw==;ORg4AjUWIQA/Gnt2VVhkQlFacldJWXxNYVF2R2BJdlRxfF9GZEwxOX1dQl9gSX1Tc0diWHdedHxVR2Y=;MTI1OTEyN0AzMjMwMmUzNDJlMzBrYmxLOE13Ti8xS256NWZrQnU1eXJSTzZjeG1XdnZUbzR0NGJTU2RwYTAwPQ==;MTI1OTEyOEAzMjMwMmUzNDJlMzBUZ09LaXpKeGhmbi9UeWRhaVNpNUtxNGkxV1NkOGJaS0dKZ2hNSXh4eDA0PQ==;NRAiBiAaIQQuGjN/V0Z+WE9EaFtKVmdWekx0RWFab1d6dV1MYFhBJAtUQF1hSn5QdkBhWH5WcHBdQGBd;MTI1OTEzMEAzMjMwMmUzNDJlMzBEMHFnSkNubHpVY0RTUkFwdlpxb2h3NXdIOUZRei9MNUVxakhJVysrT3YwPQ==;MTI1OTEzMUAzMjMwMmUzNDJlMzBXN2hPUmk1MjJXcXRybnloZTljQUh1ZzN5RDBJMlp4bE5sSm8yd1VIaFRVPQ==;Mgo+DSMBMAY9C3t2VVhkQlFacldJWXxNYVF2R2BJdlRxfF9GZEwxOX1dQl9gSX1Tc0diWHdedH1UQGI=;MTI1OTEzM0AzMjMwMmUzNDJlMzBTbGFZcFR4WlB4Q3FZaVd5ZXYzMHh3N3B4d25GY09tNDJLWHdIMTNqempFPQ==;MTI1OTEzNEAzMjMwMmUzNDJlMzBJRE9NYW9Gcjd0MU4xZFg5cEVZbnRueUxERVZZNDV5R0Iwa0kzU2xRTnJrPQ==;MTI1OTEzNUAzMjMwMmUzNDJlMzBEMHFnSkNubHpVY0RTUkFwdlpxb2h3NXdIOUZRei9MNUVxakhJVysrT3YwPQ==');


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
