import { Injectable } from '@nestjs/common';
import { isArray } from 'class-validator';
import { TelegramService } from 'src/telegram/telegram.service';

@Injectable()
export class TeslaService {
    oldVins: string[] = [] // CHANGE !! oldVins: string[]

    constructor(private telegramService: TelegramService) {
        this.runForever()
    }

    fetchInventory() {
        return fetch("https://www.tesla.com/inventory/api/v4/inventory-results?query=%7B%22query%22%3A%7B%22model%22%3A%22my%22%2C%22condition%22%3A%22new%22%2C%22options%22%3A%7B%7D%2C%22arrangeby%22%3A%22Price%22%2C%22order%22%3A%22asc%22%2C%22market%22%3A%22TR%22%2C%22language%22%3A%22tr%22%2C%22super_region%22%3A%22north%20america%22%2C%22lng%22%3A32.4206%2C%22lat%22%3A37.9275%2C%22zip%22%3A%2242110%22%2C%22range%22%3A0%2C%22region%22%3A%22TR%22%7D%2C%22offset%22%3A0%2C%22count%22%3A24%2C%22outsideOffset%22%3A0%2C%22outsideSearch%22%3Afalse%2C%22isFalconDeliverySelectionEnabled%22%3Atrue%2C%22version%22%3A%22v2%22%7D", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en,tr-TR;q=0.9,tr;q=0.8,en-US;q=0.7",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "cookie": "_pk_id.1.3c49=bfb5e679ed0b5792.1745609685.; optimizelyEndUserId=oeu1745610270668r0.8085259354014512; _gcl_au=1.1.738044726.1745610271; _ga=GA1.1.989362895.1745610272; ak_bmsc=FEE40E54C985763D767FE5A4693C5011~000000000000000000000000000000~YAAQpkUVArItxXyWAQAArIeRhht0ZuxZ/oO1uiRK3iCGv8746HWv2W7YvjFg9QtqhdMoHjSnpmq8Ah03eBWEmtkAh3sWzAh1Sx0FkOmzcbAz+eNRZEI61dYO1ZNlzgxWxPC8B2DQ8q/UOhp3ZjUYZGhmcnfOEjYA4avaStPDRIXha/QWjfG5DYQyqvAZB3Cg9Aq1q9MTD4XjHHTxCosrOP+aaqfjdiK06/Da1CoWTW5okeYgXXdOxDV01pzqGPkluYjArDM8cgzyRpjsLV28NTNAAEBTUgkP8cPWAhOuAdt5sheAXmc8NPMS+TFLx55GsgxIRhox0S0sV4Wnhxcgql8WXk+wpc/kmXt680i34UFD3NwXDwgCQCCWrtonog/GfrJQytZjU/uxPCPq2o3Tz6whpGg=; homepage_ab_test_variation=A; coin_auth_session=206f63f0500d3cff244807be1f9494f0; tsla-cookie-consent=accepted; RT=\"z=1&dm=tesla.com&si=qk8pcpaox6&ss=ma3vxsb1&sl=0&tt=0\"; ip_info={\"ip\":\"161.9.216.125\",\"location\":{\"latitude\":37.9275,\"longitude\":32.4206},\"region\":{\"longName\":\"Konya\",\"regionCode\":\"42\"},\"city\":\"Konya\",\"country\":\"TÃ¼rkiye\",\"countryCode\":\"TR\",\"postalCode\":\"34000\"}; bm_ss=ab8e18ef4e; cua_sess=c80b0f467e12f6722a3b9baf7857f1c8; bm_lso=6E08786AE2556E91B7E8F5C8153D25DF48873043374DCA16005644FBCC2E1063~YAAQVcETAoiLOoSWAQAAhHThhgPZOs0LNsH8aq5mnUAzqvOSK81qRvxzw1oQeRIWuhmkV6oOX4RZz1HRlC7QQ5kAsQDnISJGaklxLL/5XRBnycZJdn76m5B8g4kk/3sUMT/jpatH0OKN4n95slxChhH128snxERtfbFy1lIfuEiBoGVOpCVCFS7mZSeQYFMCeZ2xRooBCrVIo3AFOCgZ0rdBGUxW0keB6a86+nM2pZpBUpCWjXQsSC8mYRhtDXjekYbJRmcPcbXcfABZGlvFH0akE0aQd2XC8yJXeqdYEJoiAt3qBc73DjWT/0zYcOh4twtbEjjv5tbeXyb67NZ9RRY0VUkDl7lhjvm0t2oCWe874e2T1L57zK06sQ76Hiw1UACOIDR1X4Lk8oiCIo0XwLYu5qrLyT6BIHp2v+bcyA2ZTb+czHoVUHQDFGFXquIv4FOScjFJujD1ZjJeBw==^1746019647171; bm_s=YAAQVcETApm8OoSWAQAAoZbjhgMMf+Vv96qGTK2eB9d+uyOpduEjh0ggEGkvnIyYq08QWi/bXmEAAiNaNbv3siYoVah99T+AB7jREZIsl5w+b+eFi1YLqdpN5kvqvekLS4Pn6Jtmd44OfKeyW1FpSkaC4P6ox+KD/+EXBXgKv6aSYyLjEgc6l8mLxQANmbxIG19rJPYs56YvCEqiVTnjmRzxJdLpuAoCYEhQcQ7Kfwh6DPGPZ3yiO8oc8G6kGBXH1LLHinBFfX6NsdaeVGRHY1Hd/sPc9hYvwTzs/R6UVNyOU4eIgsFdv462iOpx9iX8CrlUYnU+dKeX9opDP+AcMMFo6Y3K2apOqurYXZSQ9Eqp/bvttMBRsRo0N/mqReG28GzRufv2JHYZ9VKpA2Dqe43UG2ICYooKO0L8fw3OTFSZ2bjXefyBhkD1ik7qbHoFQR4NFF56hOU=; bm_so=DA4A42CC25055091F45107326D39CD1340B551DF6ED959AB2CF8D8EA595871D3~YAAQVcETApq8OoSWAQAAoZbjhgNatVfB21LMmK2lnVOd8dPPApzchCKAIP9UJjlObh79xTIvsG8jStEtqVcfEE8Jvl3HA54UjiGBNcZBYcJ6X2ZtxNcV9rI8dzGeOt7QXAy4WIFjEbcjY3zOgqqOIYMJVjCoFRzsqLH1mXjh3BRwHgUBjpV4DCcMlJ2aOZROo/o1uB2mahWDeZATnIfYTzVi+f+CfT1Q6cXPk+61koJxk5SxcN8uWEc8a7zEvsh+MvToPEJ8USLAOt8/17cinCp58AAdaub+qzyn/scDmIXGNvkvhvsRUi6eBchoxbblSgUpCLiOH43n25yPygQnCEI2ZIQE3qVUZhrMzbGiZGyi0lcNS8Y+bfmOTYEtNbei7uTPl8rv+Q5OBmvzCN5ezVD0LVi4TpkK8JcoQaUOV4AkBLHrkkwD8/A3hKsfPB/PmehyY/cJGXsqtDWmBg==; bm_sv=270617C04A220F521FA91B62E7736D93~YAAQVcETApu8OoSWAQAAoZbjhhtLFKuCGNVio6xPguLPS5HKJ0wG1uLG4J5bjE5ScCkxluGv6n19VQwIV1kScMhNkShe+tpoJQ+ASzPC5ji5eTPrtHVLcLModkRH3GeqYuD0EurHIBV6N+59W2z7ENmMHffyuncx4TUCxu/Br9iMIbH3T21uw8ut6USCIp49Y43/2L3g/Ux9INuuRrH3Z5X0zrElutS7k3UU5EqB+sMSqbLQj/1icxd5qEASqBf9~1; _ga_KFP8T9JWYJ=GS1.1.1746019644.3.1.1746019784.60.0.0",
                "Referer": "https://www.tesla.com/tr_TR/inventory/new/my?arrangeby=plh&zip=42110&range=0",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        });
    }

    async isNewStockAvailable() {
        const response = await this.fetchInventory()
        try {
            const json = await response.json()
            if (json?.results && isArray(json.results)) {
                const { results } = json;
                const vins: string[] = results.map(tesla => tesla?.VIN || "")

                const uniqueVins = [...new Set(vins)];

                // Check if there's any new VIN that wasn't in oldVins
                const hasNewStock = uniqueVins.some(vin => !this.oldVins.includes(vin));

                if (hasNewStock) {
                    await this.telegramService.newInventory();
                } else {
                    this.telegramService.sameInventory();
                }

                console.log(uniqueVins);

                this.oldVins = uniqueVins;

                return json
            } else {
                this.telegramService.unknown(json).catch(console.log)

                console.log(response?.body)
            }
            return json
        } catch (error) {
            this.telegramService.unknown(error.message).catch(console.log)
            console.log(response?.body)
            console.error(error)
        }
    }

    async runForever() {
        while (true) {
            try {

                await this.isNewStockAvailable()
            } catch (error) {
                this.telegramService.unknown(error?.message).catch(console.log)

                console.error(error)
            }
            await new Promise(resolve => setTimeout(resolve, 10000));
        }
    }
}
